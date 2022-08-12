import prisma from "lib/prisma";

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
  const review = await prisma.review.create({
    data: {
      buyerId: data.buyerId,
      productId: data.productId,
      rating: data.rating,
      text: data.text,
    },
    include: { product: true },
  });
  const sellerId = review.product.userId;

  const aggregateResult = await prisma.review.aggregate({
    where: { product: { userId: sellerId } },
    _sum: { rating: true },
    _count: true,
  });

  const newRating = Math.ceil(
    aggregateResult._sum.rating / aggregateResult._count
  );
  await prisma.user.update({
    data: { rating: newRating },
    where: { id: sellerId },
  });

  res.status(200).json("");
}
