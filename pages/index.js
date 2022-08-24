import prisma from "lib/db/prisma";
import { byPremium } from "lib/db/productFilters";
import { withPagination } from "lib/db/withPagination";
import { fetchServerSide } from "lib/serverSide";
import { PRODUCT_PAGE_SIZE } from "lib/sharedConstants";

export { default } from "components/HomePage";

export async function getServerSideProps() {
  // fixme: filter (byPremium) dup with Main.js
  return {
    props: {
      products: await fetchServerSide(() => getProducts(byPremium())),
      categories: await fetchServerSide(prisma.category.findMany),
    },
  };

  async function getProducts(filter) {
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
}
