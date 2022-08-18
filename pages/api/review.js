import prisma from "lib/db/prisma";
import { createReview } from "lib/db/createReview";
import { handle } from "lib/api/server";

export default async function handler(req, res) {
  await handle(req, res, {
    POST: handlePost,
  });
}

async function handlePost(req, res) {
  const data = req.body;
  await createReview(data, prisma);
  res.status(200).end();
}
