import { getProducts } from "lib/db/product";
import { getUser } from "lib/db/user";
import { byUserId } from "lib/db/product/filters";
import { getSessionUser, withServerProps } from "lib/serverSide";

export { default } from "components/UserPage";

export async function getServerSideProps(context) {
  const requestedUserId = +context.query.id;
  const sessionUser = await getSessionUser(context);

  if (sessionUser?.id == requestedUserId) {
    return {
      redirect: {
        destination: "/profile/products",
        permanent: false,
      },
    };
  }

  return withServerProps(
    () => ({
      id: requestedUserId,
      data: () => getUser(requestedUserId),
      products: () => getProducts(byUserId(requestedUserId)),
      productFilter: byUserId(requestedUserId),
    }),
    context
  );
}
