import {
  isSignatureValid,
  isPaymentStatusValid,
  isOrderStatusValid,
  processOrder,
} from "lib/payment/server";
import prisma from "lib/db/prisma";

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

  if (!isSignatureValid(paymentData)) {
    throw new Error("Invalid signature");
  }
  if (!(await isPaymentStatusValid(paymentData))) {
    throw new Error("Invalid payment status");
  }
  if (!(await isOrderStatusValid(paymentData))) {
    throw new Error("Invalid order status");
  }

  const id = +req.query.id;
  await processOrder(paymentData);
  await prisma.product.update({ where: { id }, data: { isSold: true } });
  res.status(200).end();
}
