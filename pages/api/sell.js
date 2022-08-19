import { processOrder } from "lib/payment/server";
import { formatMoneyFromRazorpay } from "lib/money";
import prisma from "lib/db/prisma";
import { transaction } from "lib/db/transaction";
import { subtractPercent } from "lib/percentage";
import { handle } from "lib/api/server";

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
    const money = subtractPercent(
      order.amount,
      process.env.SERVICE_CHARGES_PERCENT
    );

    const product = await prisma.product.update({
      where: { id: productId },
      data: { isSold: true },
    });
    await prisma.user.update({
      where: { id: product.userId },
      data: { money: formatMoneyFromRazorpay(money) },
    });
  });

  res.status(200).end();
}
