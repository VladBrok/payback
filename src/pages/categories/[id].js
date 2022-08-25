import { withServerProps } from "lib/serverSide";
import { getCategory } from "lib/db/category";
import { getProducts } from "lib/db/product";
import { byCategoryAndPrice } from "lib/db/product/filters";

export { default } from "components/CategoryPage";

export async function getServerSideProps(context) {
  const id = +context.query.id;
  return withServerProps(
    () => ({
      id,
      data: () => getCategory(id),
      products: ({ data: category }) =>
        getProducts(byCategoryAndPrice(category?.name ?? "")),
    }),
    context
  );
}
