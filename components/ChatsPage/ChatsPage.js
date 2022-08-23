import styles from "./ChatsPage.module.scss";
import LinkToChat from "components/LinkToChat";
import withDataFetching from "components/withDataFetching";
import { get } from "lib/api/client";
import useChatConnector from "hooks/useChatConnector";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function ChatsPage({ fetchedData: chats, setFetchedData: setChats }) {
  const chatConnector = useChatConnector();
  const {
    data: { user },
  } = useSession();
  const userId = user.id;

  useEffect(() => {
    function handleChat(chat) {
      setChats(cur => (cur ? [...cur, chat] : [chat]));
    }

    return chatConnector?.connectToChats(userId, handleChat);
  }, [userId, chatConnector]);

  const chatList = chats?.map(chat => (
    <li key={chat.id}>{<LinkToChat chat={chat} />}</li>
  ));

  return (
    <>
      <Head>
        <title>Chats</title>
      </Head>
      <header>
        <h1 className={styles.title}>Chats</h1>
      </header>
      <main>
        <ul className={styles.list}>{chatList}</ul>
      </main>
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
