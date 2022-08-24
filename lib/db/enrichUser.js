import prisma from "lib/db/prisma";

export async function enrichUser(id, user) {
  if (!user) {
    return;
  }

  const reviewCount = await prisma.review.count({
    where: { product: { userId: id } },
  });

  user.reviewCount = reviewCount;
}
