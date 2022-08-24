import { getProducts } from "lib/db/product";
import { getUser } from "lib/db/user";
import { byUserId } from "lib/db/product/filters";
import { fetchServerSide, getSessionUser } from "lib/serverSide";

export { default } from "components/ProfileProductsPage";

export async function getServerSideProps(context) {
  const userId = (await getSessionUser(context))?.id;
  const products = await fetchServerSide(() => getProducts(byUserId(userId)));
  const user = await fetchServerSide(() => getUser(userId));

  return {
    props: {
      products: products?.data,
      productFilter: byUserId(userId),
      user: user.data,
    },
  };
}
