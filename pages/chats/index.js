import { getChats } from "lib/db/chat";
import { getSessionUser, fetchServerSide } from "lib/serverSide";

export { default } from "components/ChatsPage";

export async function getServerSideProps(context) {
  const userId = (await getSessionUser(context))?.id;
  const chats = await fetchServerSide(() => getChats(null, userId));

  return {
    props: {
      data: chats.data,
    },
  };
}
