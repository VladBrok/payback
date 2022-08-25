import { byPremium } from "lib/db/product/filters";
import { withServerProps } from "lib/serverSide";
import { getProducts } from "lib/db/product";
import { getCategories } from "lib/db/category";

export { default } from "components/HomePage";

export async function getServerSideProps(context) {
  return withServerProps(
    () => ({
      products: () => getProducts(byPremium()),
      productFilter: byPremium(),
      categories: () => getCategories(),
    }),
    context
  );
}
