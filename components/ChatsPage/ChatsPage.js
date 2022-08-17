import styles from "./ChatsPage.module.scss";
import Subpage from "components/Subpage";
import Chat from "components/Chat";
import Loading from "components/Loading";
import LinkToChat from "components/LinkToChat";
import { isScrolledToBottom, scrollToBottom } from "lib/document";
import { CHANNELS } from "lib/chat/constants";
import { connect } from "lib/chat/client";
import Head from "next/head";
import Error from "next/error";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { put } from "lib/api/client";
import { flushSync } from "react-dom";

function ChatsPage() {
  const [chats, setChats] = useState([]);
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
    function handleMessage(message) {
      setChats(cur =>
        cur.map(c => {
          if (c.id == message.chatId) {
            return { ...c, messages: [...c.messages, message] };
          }
          return c;
        })
      );
    }

    function handleChat(chat) {
      setChats(cur => [...cur, chat]);
    }

    return connect(chats, userId, handleMessage, handleChat);
  }, [userId, chatId, chats]);

  function handleMessageInsideBounds(message) {
    if (message.userId == userId || message.wasRead) {
      return;
    }

    flushSync(() => {
      setChats(
        chats.map(chat => {
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
    put(`message?id=${message.id}`, { wasRead: true });
  }

  const chatList = chats.map(chat => (
    <li key={chat.id}>{<LinkToChat chat={chat} userId={userId} />}</li>
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
export default ChatsPage;
