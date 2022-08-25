import { canAccessChat } from "lib/chat/server";
import { getChat } from "lib/db/chat";
import { withServerProps } from "lib/serverSide";

export { default } from "components/ChatPage";

export async function getServerSideProps(context) {
  const chatId = context.query.id;

  return withServerProps(
    sessionUser => ({
      id: chatId,
      data: () => {
        const userId = sessionUser.id;
        if (!canAccessChat(userId, chatId)) {
          return null;
        }
        return getChat(chatId, userId);
      },
    }),
    context,
    true
  );
}
