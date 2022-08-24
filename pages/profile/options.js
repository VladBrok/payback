import { getServerSideSessionUser } from "lib/serverSide";

export { default } from "components/ProfileOptionsPage";

export async function getServerSideProps(context) {
  return await getServerSideSessionUser(context);
}
