import prisma from "lib/db/prisma";
import { createReview } from "lib/db/createReview";
import { handle } from "lib/api/server";
import { getReviews } from "lib/db/getReviews";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
    POST: handlePost,
  });
}

async function handleGet(req, res) {
  const userId = +req.query.userId;
  const pageCursor = req.query.pageCursor;
  const result = await getReviews(userId, pageCursor);
  res.status(200).json(result);
}
handleGet.allowUnauthorized = true;

async function handlePost(req, res) {
  const data = req.body;
  await createReview(data, prisma);
  res.status(200).end();
}
