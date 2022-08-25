import { handle } from "lib/api/server";
import { createOrder } from "lib/payment/server";
import { getProduct } from "lib/db/product";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
  });
}

async function handleGet(req, res) {
  const productId = +req.query.id;
  const price = (await getProduct(productId))?.price;
  if (price == null) {
    res.status(404).end();
    return;
  }

  const order = await createOrder(+price);
  res.status(200).json(order);
}
