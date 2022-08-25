import { withServerProps } from "lib/serverSide";
import { getProducts, getProduct } from "lib/db/product";
import { bySimilar } from "lib/db/product/filters";

export { default } from "components/ProductPage";

export async function getServerSideProps(context) {
  const id = +context.query.id;

  return withServerProps(
    () => ({
      id,
      data: () => getProduct(id),
      products: ({ data: product }) => getProducts(bySimilar(product)),
      productFilter: ({ data: product }) => bySimilar(product),
    }),
    context
  );
}
