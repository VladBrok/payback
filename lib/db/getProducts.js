import prisma from "lib/db/prisma";
import { withPagination } from "lib/db/withPagination";
import { PRODUCT_PAGE_SIZE } from "lib/sharedConstants";

// fixme: dup with api/product
export async function getProducts(filter) {
  return await withPagination(
    prisma.product.findMany,
    {
      where: filter,
      include: { category: true },
      orderBy: { id: "desc" },
    },
    PRODUCT_PAGE_SIZE
  );
}
