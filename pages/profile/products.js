import { getProducts } from "lib/db/product";
import { getUser } from "lib/db/user";
import { byUserId } from "lib/db/product/filters";
import { withServerProps } from "lib/serverSide";

export { default } from "components/ProfileProductsPage";

export async function getServerSideProps(context) {
  return withServerProps(
    sessionUser => ({
      products: () => getProducts(byUserId(sessionUser.id)),
      productFilter: byUserId(sessionUser.id),
      user: () => getUser(sessionUser.id),
    }),
    context,
    true
  );
}
