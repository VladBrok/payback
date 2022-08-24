import { getUser } from "lib/db/user";
import { fetchServerSide, getSessionUser } from "lib/serverSide";

export { default } from "components/ProfileOptionsPage";

export async function getServerSideProps(context) {
  const userId = (await getSessionUser(context))?.id;
  const user = await fetchServerSide(() => getUser(userId));

  return {
    props: {
      user: user.data,
    },
  };
}
