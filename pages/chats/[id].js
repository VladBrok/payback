import { canAccessChat } from "lib/chat/server";
import { getServerSideSessionUser } from "lib/serverSide";

export { default } from "components/ChatPage";

export async function getServerSideProps(context) {
  const chatId = context.query.id;
  const sessionUser = (await getServerSideSessionUser(context)).props
    .sessionUser;

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
