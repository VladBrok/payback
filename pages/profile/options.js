import { getServerSideSessionUser } from "lib/serverSideProps";

export { default } from "components/ProfileOptionsPage";

export async function getServerSideProps(context) {
  return await getServerSideSessionUser(context);
}
