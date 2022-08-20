import styles from "./ChatsPage.module.scss";
import Subpage from "components/Subpage";
import Chat from "components/Chat";
import LinkToChat from "components/LinkToChat";
import withDataFetching from "components/withDataFetching";
import { isScrolledToBottom, scrollToBottom } from "lib/document";
import { CHANNELS } from "lib/chat/constants";
import { get, put } from "lib/api/client";
import Head from "next/head";
import Error from "next/error";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

function ChatsPage({ fetchedData: chats, setFetchedData: setChats }) {
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
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
    import("lib/chat/client").then(({ connect }) => {
      setChatConnector({ connect });
    });
  }, []);

  useEffect(() => {
    function handleMessage(message) {
      setShouldScrollToBottom(
        chatId != null && (message.userId == userId || isScrolledToBottom())
      );

      setChats(cur =>
        cur?.map(c => {
          if (c.id == message.chatId) {
            return { ...c, messages: [...c.messages, message] };
          }
          return c;
        })
      );
    }

    function handleChat(chat) {
      setChats(cur => (cur ? [...cur, chat] : [chat]));
    }

    return chatConnector.connect?.(chats, userId, handleMessage, handleChat);
  }, [userId, chatId, chats, chatConnector]);

  useEffect(() => {
    setShouldScrollToBottom(chatId != null);
  }, [chatId]);

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
    }
  }, [chats, shouldScrollToBottom]);

  function handleMessageInsideBounds(message) {
    if (message.userId == userId || message.wasRead) {
      return;
    }

    flushSync(() => {
      setChats(
        chats?.map(chat => {
          if (chat.id == message.chatId) {
            return {
              ...chat,
              messages: chat.messages.map(m =>
                m.id == message.id ? { ...message, wasRead: true } : m
              ),
            };
          }

          return chat;
        })
      );
    });
    put(`/api/message?id=${message.id}`, { wasRead: true });
  }

  let content = "";
  if (chatId == null) {
    const chatList = chats?.map(chat => (
      <li key={chat.id}>{<LinkToChat chat={chat} userId={userId} />}</li>
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
          messages={chat.messages}
          chatId={chatId}
          channelName={`${CHANNELS.ENCRYPTED_BASE}${chatId}`}
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
  () => get("/api/chat"),
  () => ({}),
  true
);
hoc.auth = ChatsPage.auth;

export default hoc;
