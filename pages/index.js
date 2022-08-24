import prisma from "lib/db/prisma";
import { byPremium } from "lib/db/productFilters";
import { withPagination } from "lib/db/withPagination";
import { PRODUCT_PAGE_SIZE } from "lib/sharedConstants";
import { stringify } from "superjson";

export { default } from "components/HomePage";

export async function getServerSideProps() {
  let products;
  let categories;

  // fixme: filter (byPremium) dup with Main.js
  try {
    products = await getProducts(byPremium());
  } catch (err) {
    console.log(err);
    products = null;
  }

  try {
    categories = await prisma.category.findMany();
  } catch (err) {
    console.log(err);
    categories = null;
  }

  return {
    props: {
      products: JSON.parse(stringify(products)).json,
      categories: JSON.parse(stringify(categories)).json,
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
