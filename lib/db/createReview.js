import { transaction } from "./transaction";

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

    const newRating = Math.ceil(
      aggregateResult._sum.rating / aggregateResult._count
    );

    await prisma.user.update({
      data: { rating: newRating },
      where: { id: sellerId },
    });
  });
}
