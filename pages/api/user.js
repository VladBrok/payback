import prisma from "lib/db/prisma";
import { handle } from "lib/api/server";

export default async function handler(req, res) {
  await handle(req, res, {
    GET: handleGet,
  });
}

async function handleGet(req, res) {
  const id = +req.query.id;
  const user = await prisma.user.findFirst({
    where: { id },
  });
  const reviewCount = await prisma.review.count({
    where: { product: { userId: id } },
  });
  res.status(200).json({ ...user, reviewCount });
}
handleGet.allowUnauthorized = true;
