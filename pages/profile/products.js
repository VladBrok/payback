import { getSessionUser } from "lib/serverSide";

export { default } from "components/ProfileProductsPage";

export async function getServerSideProps(context) {
  return {
    props: {
      sessionUser: await getSessionUser(context),
    },
  };
}
