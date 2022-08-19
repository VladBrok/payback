import prisma from "lib/db/prisma";

export async function enrichUser(id, user) {
  const reviewCount = await prisma.review.count({
    where: { product: { userId: id } },
  });

  user.reviewCount = reviewCount;
}
