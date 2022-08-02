import Router from "components/Router";
import Subpage from "components/Subpage";

export default function ChatPage() {
  return (
    <Router>
      {({ id: chatId }) => (
        <Subpage title="todo">Chat with id {chatId}</Subpage>
      )}
    </Router>
  );
}
