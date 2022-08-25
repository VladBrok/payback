import prisma from "lib/db/prisma";
import { withPagination } from "lib/db/withPagination";
import { PRODUCT_PAGE_SIZE } from "lib/sharedConstants";

// todo: move all functions for data retrieving from api to lib/db files
export async function getProducts(filter, pageCursor) {
  return await withPagination(
    prisma.product.findMany,
    {
      where: pageCursor
        ? { AND: [filter, { id: { lt: +pageCursor } }] }
        : filter,
      include: { category: true },
      orderBy: { id: "desc" },
    },
    PRODUCT_PAGE_SIZE
  );
}
