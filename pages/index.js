import { byPremium } from "lib/db/product/filters";
import { fetchServerSide } from "lib/serverSide";
import { getProducts } from "lib/db/product";
import { getCategories } from "lib/db/category";

export { default } from "components/HomePage";

export async function getServerSideProps() {
  return {
    props: {
      products: (await fetchServerSide(() => getProducts(byPremium()))).data,
      productFilter: byPremium(),
      categories: (await fetchServerSide(getCategories)).data,
    },
  };
}
