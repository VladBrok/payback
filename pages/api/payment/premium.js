import { handle } from "lib/api/server";
import { createOrder } from "lib/payment/server";

export default async function handler(req, res) {
  await handle(req, res, {
    POST: handlePost,
  });
}

async function handlePost(_, res) {
  const order = await createOrder(process.env.PREMIUM_COST);
  res.status(200).json(order);
}
