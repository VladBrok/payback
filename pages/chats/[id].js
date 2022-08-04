import Router from "components/Router";
import Subpage from "components/Subpage";
import Chat from "components/Chat";
import chats from "data/chats.json";
import { byId } from "lib/chatFinders";
import { useSession } from "next-auth/react";

function ChatPage() {
  const {
    data: { user },
  } = useSession(); // fixme: dup

  return (
    <Router>
      {({ id: chatId }) => {
        const chat = chats.find(byId(chatId));

        return (
          <Subpage title={chat.name}>
            <Chat useId={user.email} /> {/* fixme: use id */}
          </Subpage>
        );
      }}
    </Router>
  );
}

ChatPage.auth = true;
export default ChatPage;
