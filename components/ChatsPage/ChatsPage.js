import styles from "./ChatsPage.module.scss";
import User from "components/User";
import Subpage from "components/Subpage";
import Chat from "components/Chat";
import NewMessages from "components/NewMessages";
import LinkToChat from "components/LinkToChat";
import Loading from "components/Loading";
import { isScrolledToBottom, scrollToBottom } from "lib/document";
import { EVENTS, CHANNELS } from "lib/chat/constants";
import { post } from "lib/api";
import Pusher from "pusher-js/with-encryption";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FcApproval } from "react-icons/fc";
import { useEffect, useState } from "react";

// todo: refactor (too large)
function ChatsPage() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  const router = useRouter();
  const chatId = router.query?.id;
  const {
    data: { user },
  } = useSession();
  const userId = user.id;

  useEffect(() => {
    async function getChats() {
      const response = await fetch(`/api/chat?userId=${userId}`);
      if (!response.ok) {
        console.log("failed to load chats");
      } else {
        setChats(await response.json());
      }
    }

    getChats();
  }, [userId]);

  useEffect(() => {
    if (chatId == null) {
      return;
    }

    if (!chats.length) {
      return;
    }

    if (!chats.find(c => c.id == chatId)) {
      async function createChat() {
        const response = await post("chat", { chatId });
        if (!response.ok) {
          console.log("failed to create a chat");
        } else {
          const chat = await response.json();
          setChats(cur => [...cur, chat]);
        }
      }

      createChat();
    }
  }, [chatId, chats]);

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
  }, [userId]);

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
    }
  }, [messages, shouldScrollToBottom]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (chatId == null) {
      setNewMessageCount(0);
    }
  }, [router.isReady, chatId]);

  const chatList = chats.map(c => (
    <li key={c.id}>
      <LinkToChat chatId={c.id} className={styles["user-container"]} shallow>
        <User
          name={
            <span className={styles.username}>
              {c.name} <FcApproval className={styles.icon} />{" "}
              <NewMessages count={newMessageCount} />
            </span>
          }
          imageUrl={c.image}
        />
      </LinkToChat>
    </li>
  ));

  let content = "";
  if (chatId == null) {
    content = (
      <>
        <h1 className={styles.title}>Chats</h1>
        <ul className={styles.list}>{chatList}</ul>
      </>
    );
  } else {
    const chat = chats.find(c => c.id == chatId);
    content = chat ? (
      <Subpage title={chat.name}>
        <Chat userId={userId} messages={messages} />
      </Subpage>
    ) : (
      <Loading />
    );
  }

  return (
    <>
      <Head>
        <title>Chats</title>
      </Head>
      {content}
    </>
  );
}

ChatsPage.auth = true;
export default ChatsPage;
