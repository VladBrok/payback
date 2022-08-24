import { getServerSideSessionUser } from "lib/serverSide";

export { default } from "components/ProfileProductsPage";

export async function getServerSideProps(context) {
  return await getServerSideSessionUser(context);
}
