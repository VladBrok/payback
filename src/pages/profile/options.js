import { getUser } from "lib/db/user";
import { withServerProps } from "lib/serverSide";

export { default } from "components/ProfileOptionsPage";

export async function getServerSideProps(context) {
  return withServerProps(
    sessionUser => ({
      user: () => getUser(sessionUser.id),
    }),
    context,
    true
  );
}
