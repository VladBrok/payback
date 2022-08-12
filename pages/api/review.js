import prisma from "lib/prisma";
import { createReview } from "lib/db/createReview";

// fixme: change error codes
// fixme: protect with next-auth
export default async function handler(req, res) {
  let handle;

  if (req.method === "GET") {
    handle = handleGet;
  } else if (req.method === "POST") {
    handle = handlePost;
  } else {
    res.status(400).json({ error: `Method ${req.method} is not supported.` });
    return;
  }

  try {
    await handle(req, res);
  } catch (er) {
    console.log(er);
    res.status(500).json({ error: "Fail" });
  }
}

async function handleGet(req, res) {
  const sellerId = +req.query.sellerId;
  const reviews = await prisma.review.findMany({
    where: { product: { userId: sellerId } },
    include: { product: true, buyer: true },
  });
  res.status(200).json(reviews);
}

async function handlePost(req, res) {
  const data = req.body;
  await createReview(data, prisma);
  res.status(200).json("");
}
