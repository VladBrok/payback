import prisma from "lib/db/prisma";

export async function getUser(id) {
  const user = await prisma.user.findFirst({
    where: { id },
  });

  await enrichUser(id, user);
  return user;
}

export async function enrichUser(id, user) {
  if (!user) {
    return;
  }

  const reviewCount = await prisma.review.count({
    where: { product: { userId: id } },
  });

  user.reviewCount = reviewCount;
}
