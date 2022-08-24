import prisma from "lib/db/prisma";
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
