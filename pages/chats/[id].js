import Router from "components/Router";
import Subpage from "components/Subpage";
import chats from "data/chats.json";
import { byId } from "lib/chatFinders";

export default function ChatPage() {
  return (
    <Router>
      {({ id: chatId }) => {
        const chat = chats.find(byId(chatId));

        return <Subpage title={chat.name}></Subpage>;
      }}
    </Router>
  );
}
