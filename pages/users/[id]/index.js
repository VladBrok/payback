import { getProducts } from "lib/db/getProducts";
import { getUser } from "lib/db/getUser";
import { byUserId } from "lib/db/productFilters";
import { fetchServerSide, getServerSideSessionUser } from "lib/serverSide";

export { default } from "components/UserPage";

export async function getServerSideProps(context) {
  const requestedUserId = +context.query.id;
  const sessionUser = (await getServerSideSessionUser(context)).props
    .sessionUser;

  if (sessionUser?.id == requestedUserId) {
    return {
      redirect: {
        destination: "/profile/products",
        permanent: false,
      },
    };
  }

  const result = await fetchServerSide(() => getUser(requestedUserId));
  if (result.notFound) {
    return {
      notFound: true,
    };
  }

  // fixme: dups
  const products = await fetchServerSide(() =>
    getProducts(byUserId(requestedUserId))
  );

  return {
    props: {
      id: requestedUserId,
      data: result.data,
      products: products.data,
      productFilter: byUserId(requestedUserId),
    },
  };
}
