import { processOrder } from "lib/payment/server";
import { formatMoneyFromRazorpay } from "lib/money";
import prisma from "lib/db/prisma";
import { transaction } from "lib/db/transaction";
import { subtractPercent } from "lib/percentage";
import { handle } from "lib/api/server";
import { updateProduct } from "lib/db/product";
import { updateUser } from "lib/db/user";

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

    const product = await updateProduct({ isSold: true }, productId);
    const newMoney = +product.user.money + formatMoneyFromRazorpay(gain);

    await updateUser({ money: newMoney }, product.userId);
  });

  res.status(200).end();
}
