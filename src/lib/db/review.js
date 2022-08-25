import prisma from "lib/db/prisma";
import { transaction } from "lib/db/transaction";
import { REVIEW_PAGE_SIZE } from "lib/sharedConstants";
import { withPagination } from "lib/db/withPagination";

export async function getReviews(userId, pageCursor) {
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

  return result;
}

export async function createReview(data, prisma) {
  await transaction(prisma, async prisma => {
    const review = await prisma.review.create({
      data: {
        ...data,
      },
      include: { product: true },
    });
    const sellerId = review.product.userId;

    const aggregateResult = await prisma.review.aggregate({
      where: { product: { userId: sellerId } },
      _sum: { rating: true },
      _count: true,
    });

    const newRating = aggregateResult._sum.rating / aggregateResult._count;
    await prisma.user.update({
      data: { rating: newRating },
      where: { id: sellerId },
    });
  });
}
