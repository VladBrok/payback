import { handle } from "lib/api/server";
import { createOrder } from "lib/payment/server";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
  });
}

async function handleGet(_, res) {
  const order = await createOrder(process.env.PREMIUM_COST);
  res.status(200).json(order);
}
