import { getServerSideSessionUser } from "lib/serverSideProps";

export { default } from "components/ProfileProductsPage";

export async function getServerSideProps(context) {
  return await getServerSideSessionUser(context);
}
