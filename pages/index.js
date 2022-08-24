import prisma from "lib/db/prisma";
import { byPremium } from "lib/db/productFilters";
import { fetchServerSide } from "lib/serverSide";
import { getProducts } from "lib/db/getProducts";

export { default } from "components/HomePage";

export async function getServerSideProps() {
  return {
    props: {
      products: (await fetchServerSide(() => getProducts(byPremium()))).data,
      productFilter: byPremium(),
      categories: (await fetchServerSide(prisma.category.findMany)).data,
    },
  };
}
