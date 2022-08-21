import styles from "./ChatsPage.module.scss";
import Subpage from "components/Subpage";
import Chat from "components/Chat";
import LinkToChat from "components/LinkToChat";
import withDataFetching from "components/withDataFetching";
import { get } from "lib/api/client";
import Head from "next/head";
import Error from "next/error";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function ChatsPage({ fetchedData: chats, setFetchedData: setChats }) {
  const [chatConnector, setChatConnector] = useState({});
  const router = useRouter();
  const chatId = router.query?.id;
  const {
    data: { user },
  } = useSession();
  const userId = user.id;

  useEffect(() => {
    // This module needs window object in order to work
    // so it can't be placed at the top with other modules
    import("lib/chat/client").then(module => {
      setChatConnector(module);
    });
  }, []);

  useEffect(() => {
    function handleChat(chat) {
      setChats(cur => (cur ? [...cur, chat] : [chat]));
    }

    return chatConnector.connectToChats?.(userId, handleChat);
  }, [userId, chatConnector]);

  function handleMessageInsideBounds(message) {
    setChats(cur =>
      cur.map(c => {
        if (message.chatId == c.id) {
          return {
            ...c,
            newMessageCount: c.newMessageCount - 1,
          };
        }

        return c;
      })
    );
  }

  let content = "";
  if (chatId == null) {
    const chatList = chats?.map(chat => (
      <li key={chat.id}>{<LinkToChat chat={chat} />}</li>
    ));
    content = (
      <>
        <h1 className={styles.title}>Chats</h1>
        <ul className={styles.list}>{chatList}</ul>
      </>
    );
  } else {
    const chat = chats?.find(c => c.id == chatId);
    content = chat ? (
      <Subpage title={chat.name}>
        <Chat
          userId={userId}
          chatId={chatId}
          chatConnector={chatConnector}
          onMessageInsideBounds={handleMessageInsideBounds}
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
const hoc = withDataFetching(
  ChatsPage,
  (_x, _y, pageCursor) => get(`/api/chat?pageCursor=${pageCursor}`),
  () => ({}),
  true
);
hoc.auth = ChatsPage.auth;

export default hoc;
