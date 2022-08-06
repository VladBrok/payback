import styles from "./ChatsPage.module.scss";
import User from "components/User";
import Router from "components/Router";
import Subpage from "components/Subpage";
import Chat from "components/Chat";
import NewMessages from "components/NewMessages";
import chatData from "data/chats.json";
import { byId } from "lib/chatFinders";
import { byUserId } from "lib/chatFilters";
import { EVENTS, CHANNELS } from "lib/chat/constants";
import Pusher from "pusher-js/with-encryption";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { FcApproval } from "react-icons/fc";
import { useEffect, useState } from "react";

// todo: refactor (too large)
function ChatsPage() {
  const [messages, setMessages] = useState([]);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const {
    data: { user },
  } = useSession();
  const userId = user.email; // fixme: use id instead of an email (requires db)

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      authEndpoint: "api/auth/chat",
      auth: {
        params: { userId },
      },
    });

    const channel = pusher.subscribe(CHANNELS.ENCRYPTED_TEST);
    channel.bind(EVENTS.SUBSCRIPTION_ERROR, er =>
      console.log("subscription error", er)
    );
    channel.bind(EVENTS.MESSAGE, message => {
      setShouldScrollToBottom(isScrolledToBottom() || message.from == userId);
      setMessages(current => [...current, message]);
      setNewMessageCount(current => current + 1);
    });

    return () => {
      pusher.unsubscribe(CHANNELS.ENCRYPTED_TEST);
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    if (shouldScrollToBottom) {
      doc().scroll(0, doc().scrollHeight);
    }
  }, [messages]);

  function isScrolledToBottom() {
    return (
      Math.abs(doc().scrollHeight - doc().scrollTop - doc().offsetHeight) <= 3
    );
  }

  function doc() {
    return document.documentElement;
  }

  const chats = chatData.filter(byUserId(userId)).map(d => (
    <li key={d.id}>
      <Link href={`/chats?id=${d.id}`} shallow>
        <a className={styles["user-container"]}>
          <User
            name={
              <span className={styles.username}>
                {d.name} <FcApproval className={styles.icon} />{" "}
                <NewMessages count={newMessageCount} />
              </span>
            }
            imageUrl={d.image}
          />
        </a>
      </Link>
    </li>
  ));

  return (
    <>
      <Head>
        <title>Chats</title>
      </Head>

      <Router>
        {({ id: chatId }) => {
          useEffect(() => {
            if (chatId == null) {
              setNewMessageCount(0);
            }
          }, [chatId]);

          if (chatId == null) {
            return (
              <>
                <h1 className={styles.title}>Chats</h1>
                <ul className={styles.list}>{chats}</ul>
              </>
            );
          }

          const chat = chatData.find(byId(chatId));
          return (
            <Subpage title={chat.name}>
              <Chat userId={userId} messages={messages} />
            </Subpage>
          );
        }}
      </Router>
    </>
  );
}

ChatsPage.auth = true;
export default ChatsPage;
