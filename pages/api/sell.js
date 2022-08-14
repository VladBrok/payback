import { processOrder } from "lib/payment/server";
import { formatMoneyFromRazorpay } from "lib/money";
import prisma from "lib/db/prisma";
import { subtractPercent } from "lib/percentage";

// fixme: change error codes
// fixme: protect with next-auth
// fixme: dup
export default async function handler(req, res) {
  let handle;

  if (req.method === "POST") {
    handle = handlePost;
  } else {
    res.status(400).json({ error: `Method ${req.method} is not supported.` });
    return;
  }

  try {
    await handle(req, res);
  } catch (er) {
    console.log(er);
    res.status(500).json({ error: "Fail" });
  }
}

async function handlePost(req, res) {
  const paymentData = req.body;
  const productId = +req.query.productId;
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

  res.status(200).end();
}
