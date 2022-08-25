import styles from "./ChatsPage.module.scss";
import LinkToChat from "components/LinkToChat";
import withDataFetching from "components/withDataFetching";
import { get } from "lib/api/client";
import useChatConnector from "hooks/useChatConnector";
import useSessionUser from "hooks/useSessionUser";
import Head from "next/head";
import { useEffect } from "react";

function ChatsPage({ fetchedData: chats, setFetchedData: setChats }) {
  const chatConnector = useChatConnector();
  const sessionUser = useSessionUser();
  const userId = sessionUser.id;

  useEffect(() => {
    function handleChat(chat) {
      setChats(cur => (cur ? [...cur, chat] : [chat]));
    }

    return chatConnector?.connectToChats(userId, handleChat);
  }, [userId, chatConnector, setChats]);

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

export default withDataFetching(
  ChatsPage,
  (_x, _y, pageCursor) => get(`/api/chat?pageCursor=${pageCursor}`),
  () => ({}),
  true
);
