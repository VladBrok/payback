import { getChats } from "lib/db/chat";
import { withServerProps } from "lib/serverSide";

export { default } from "components/ChatsPage";

export async function getServerSideProps(context) {
  const pageCursor = null;
  return withServerProps(
    sessionUser => ({
      data: () => getChats(pageCursor, sessionUser.id),
    }),
    context,
    true
  );
}
