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
  const userId = +req.query.userId;
  const reviews = await prisma.review.findMany({
    where: { product: { userId } },
    include: { buyer: true, product: true },
  });
  res.status(200).json(reviews);
}

async function handlePost(req, res) {
  const data = req.body;
  await createReview(data, prisma);
  res.status(200).end();
}
