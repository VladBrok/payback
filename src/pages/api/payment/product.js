import { handle } from "lib/api/server";
import { createOrder } from "lib/payment/server";
import prisma from "lib/db/prisma";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
  });
}

async function handleGet(req, res) {
  const productId = +req.query.id;
  const price = (await prisma.product.findFirst({ where: { id: productId } }))
    ?.price;
  if (price == null) {
    throw new Error(`Product with id ${productId} not found.`);
  }

  const order = await createOrder(+price);
  res.status(200).json(order);
}