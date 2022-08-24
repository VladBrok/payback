import { fetchServerSide } from "lib/serverSide";
import { getCategory } from "lib/db/category";
import { byCategoryAndPrice } from "lib/db/product/filters";
import { getProducts } from "lib/db/product";

export { default } from "components/CategoryPage";

export async function getServerSideProps(context) {
  const id = +context.query.id;
  const category = await fetchServerSide(() => getCategory(id));

  if (category.notFound) {
    return {
      notFound: true,
    };
  }

  const categoryName = category.data.name;

  return {
    props: {
      id,
      data: category.data,
      products: (
        await fetchServerSide(() =>
          getProducts(byCategoryAndPrice(categoryName))
        )
      ).data,
    },
  };
}
