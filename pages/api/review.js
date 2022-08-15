import prisma from "lib/db/prisma";
import { createReview } from "lib/db/createReview";
import { handle } from "lib/api/server";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
    POST: handlePost,
  });
}

async function handleGet(req, res) {
  const sellerId = +req.query.sellerId;
  const reviews = await prisma.review.findMany({
    where: { product: { userId: sellerId } },
    include: { product: true, buyer: true },
  });
  res.status(200).json(reviews);
}
handleGet.allowUnauthorized = true;

async function handlePost(req, res) {
  const data = req.body;
  await createReview(data, prisma);
  res.status(200).end();
}
