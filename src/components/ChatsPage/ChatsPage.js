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
  const userId = useSessionUser().id;

  useEffect(() => {
    function handleChat(chat) {
      setChats(cur => (cur ? [...cur, chat] : [chat]));
    }

    function handleMessage(message) {
      setChats(cur =>
        cur.map(chat => {
          if (chat.id === message.chatId) {
            return {
              ...chat,
              newMessageCount: (chat.newMessageCount ?? 0) + 1,
            };
          }

          return chat;
        })
      );
    }

    const disposeChatConnection = chatConnector?.connectToChats(
      userId,
      handleChat
    );
    const messageConnections = chats?.map(chat =>
      chatConnector?.connectToMessages(chat.id, handleMessage)
    );

    return () => {
      disposeChatConnection?.();
      messageConnections?.forEach(dispose => dispose?.());
    };
  }, [userId, chatConnector, setChats, chats]);

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
