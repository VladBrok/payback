import { handle } from "lib/api/server";
import { createOrder } from "lib/payment/server";

export default async function handler(req, res) {
  await handle(req, res, {
    POST: handlePost,
  });
}

async function handlePost(req, res) {
  const productId = +req.query.id;
  const price = (await prisma.product.findFirst({ where: { id: productId } }))
    ?.price;
  if (price == null) {
    throw new Error(`Product with id ${productId} not found.`);
  }

  const order = await createOrder(price);
  res.status(200).json(order);
}
