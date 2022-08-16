import styles from "./ChatsPage.module.scss";
import User from "components/User";
import Subpage from "components/Subpage";
import Chat from "components/Chat";
import NewMessages from "components/NewMessages";
import Loading from "components/Loading";
import { isScrolledToBottom, scrollToBottom } from "lib/document";
import { EVENTS, CHANNELS } from "lib/chat/constants";
import Pusher from "pusher-js/with-encryption";
import Head from "next/head";
import Link from "next/link";
import Error from "next/error";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FcApproval } from "react-icons/fc";
import { useEffect, useState } from "react";

// todo: refactor (too large)
function ChatsPage() {
  const [chats, setChats] = useState([]);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true); // fixme: works badly

  const router = useRouter();
  const chatId = router.query?.id;
  const {
    data: { user },
  } = useSession();
  const userId = user.id;

  useEffect(() => {
    async function getChats() {
      const response = await fetch("/api/chat");
      if (!response.ok) {
        console.log("failed to load chats");
      } else {
        setChats(await response.json());
      }
    }

    getChats();
  }, []);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      authEndpoint: "api/auth/chat",
    });

    chats.forEach(c => {
      const messageChannel = pusher.subscribe(
        `${CHANNELS.ENCRYPTED_BASE}${c.id}`
      );
      messageChannel.bind(EVENTS.SUBSCRIPTION_ERROR, er =>
        console.log("subscription error", er)
      );
      messageChannel.bind(EVENTS.MESSAGE, message => {
        setShouldScrollToBottom(
          chatId != null && (isScrolledToBottom() || message.userId == userId)
        );
        setChats(cur =>
          cur.map(c => {
            if (c.id == message.chatId) {
              return { ...c, messages: [...c.messages, message] };
            }
            return c;
          })
        );
      });
    });

    const chatChannelName = `${CHANNELS.ENCRYPTED_BASE}${userId}`;
    const chatChannel = pusher.subscribe(chatChannelName);
    chatChannel.bind(EVENTS.SUBSCRIPTION_ERROR, er =>
      console.log("subscription error", er)
    );
    chatChannel.bind(EVENTS.CHAT, chat => {
      setChats(cur => [...cur, chat]);
    });

    return () => {
      pusher.disconnect();
    };
  }, [userId, chatId, chats]);

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
    }
  }, [chats, shouldScrollToBottom]);

  const chatList = chats.map(chat => (
    <li key={chat.id}>
      <Link href={`/chats?id=${chat.id}`} shallow>
        <a className={styles["user-container"]}>
          <User
            name={
              <span className={styles.username}>
                {chat.name}{" "}
                {chat.isVerified && <FcApproval className={styles.icon} />}{" "}
                {/* <NewMessages count={newMessageCount} /> */}
              </span>
            }
            imageUrl={chat.image}
          />
        </a>
      </Link>
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
  } else if (!chats.length) {
    content = <Loading />;
  } else {
    const chat = chats.find(c => c.id == chatId);
    content = chat ? (
      <Subpage title={chat.name}>
        <Chat
          userId={userId}
          messages={chat.messages}
          chatId={chatId}
          channelName={`${CHANNELS.ENCRYPTED_BASE}${chatId}`}
        />
      </Subpage>
    ) : (
      <Error statusCode={404} />
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
