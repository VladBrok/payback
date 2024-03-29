import { handle } from "lib/api/server";
import prisma from "lib/db/prisma";
import { transaction } from "lib/db/transaction";
import { formatMoneyFromRazorpay } from "lib/money";
import { processOrder } from "lib/payment/server";
import { subtractPercent } from "lib/percentage";

export default async function handler(req, res) {
  await handle(req, res, {
    POST: handlePost,
  });
}

async function handlePost(req, res) {
  const paymentData = req.body;
  const productId = +req.query.productId;

  await transaction(prisma, async prisma => {
    const order = await processOrder(paymentData);
    const gain = subtractPercent(
      order.amount,
      process.env.SERVICE_CHARGES_PERCENT
    );

    const product = await prisma.product.update({
      where: { id: productId },
      data: { isSold: true },
      include: { user: true },
    });
    const newMoney = +product.user.money + formatMoneyFromRazorpay(gain);

    await prisma.user.update({
      where: { id: product.userId },
      data: { money: newMoney },
    });
  });

  res.status(200).end();
}
