import prisma from "lib/db/prisma";
import { createReview } from "lib/db/createReview";
import { REVIEW_PAGE_SIZE } from "lib/sharedConstants";
import { handle } from "lib/api/server";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
    POST: handlePost,
  });
}

async function handleGet(req, res) {
  const userId = +req.query.userId;
  const pageCursor = req.query.pageCursor;
  const filter = { product: { userId } };

  const reviews = await prisma.review.findMany({
    where: pageCursor ? { AND: [filter, { id: { lt: +pageCursor } }] } : filter,
    include: { buyer: true, product: true },
    take: REVIEW_PAGE_SIZE + 1,
    orderBy: { id: "desc" },
  });

  const newCursor =
    reviews.length >= REVIEW_PAGE_SIZE + 1 ? reviews.at(-2).id : undefined;
  const pageData =
    reviews.length >= REVIEW_PAGE_SIZE + 1 ? reviews.slice(0, -1) : reviews;

  res.status(200).json({ pageData, pageCursor: newCursor });
}

async function handlePost(req, res) {
  const data = req.body;
  await createReview(data, prisma);
  res.status(200).end();
}
