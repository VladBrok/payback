import { canAccessChat } from "lib/chat/server";
import { getSessionUser } from "lib/serverSide";

export { default } from "components/ChatPage";

export async function getServerSideProps(context) {
  const chatId = context.query.id;
  const sessionUser = await getSessionUser(context);

  if (!canAccessChat(sessionUser?.id, chatId)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: chatId,
    },
  };
}
