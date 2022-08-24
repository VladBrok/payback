import { canAccessChat } from "lib/chat/server";
import { getChat } from "lib/db/chat";
import { getSessionUser, fetchServerSide } from "lib/serverSide";

export { default } from "components/ChatPage";

export async function getServerSideProps(context) {
  const chatId = context.query.id;
  const userId = (await getSessionUser(context))?.id;

  if (!canAccessChat(userId, chatId)) {
    return {
      notFound: true,
    };
  }

  const chat = await fetchServerSide(() => getChat(chatId, userId));

  return {
    props: {
      id: chatId,
      data: chat.data,
    },
  };
}
