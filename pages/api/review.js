import prisma from "lib/db/prisma";
import { createReview } from "lib/db/createReview";
import { REVIEW_PAGE_SIZE } from "lib/sharedConstants";
import { handle, withPagination } from "lib/api/server";

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

  const result = await withPagination(
    prisma.review.findMany,
    {
      where: pageCursor
        ? { AND: [filter, { id: { lt: +pageCursor } }] }
        : filter,
      include: { buyer: true, product: true },
      orderBy: { id: "desc" },
    },
    REVIEW_PAGE_SIZE
  );

  res.status(200).json(result);
}

async function handlePost(req, res) {
  const data = req.body;
  await createReview(data, prisma);
  res.status(200).end();
}
