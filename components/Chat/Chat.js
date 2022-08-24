import styles from "./Chat.module.scss";
import Form from "components/Form";
import Message from "components/Message";
import withDataFetching from "components/withDataFetching";
import { PaybackError } from "lib/errors";
import { get, post, put } from "lib/api/client";
import { isScrolledToBottom, scrollToBottom } from "lib/document";
import useChatConnector from "hooks/useChatConnector";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

function Chat({
  userId,
  chatId,
  fetchedData: messages,
  setFetchedData: setMessages,
}) {
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const chatConnector = useChatConnector();
  const inputRef = useRef();
  const topmostMessageRef = useRef();
  const prevTopmostMessageRef = useRef();

  prevTopmostMessageRef.current = topmostMessageRef.current;
  const prevOffsetTop = topmostMessageRef.current?.getBoundingClientRect().top;

  useEffect(() => {
    function handleMessage(message) {
      setShouldScrollToBottom(message.userId == userId || isScrolledToBottom());
      setMessages(cur => (cur ? [message, ...cur] : [message]));
    }

    return chatConnector?.connectToMessages(chatId, handleMessage);
  }, [chatId, userId, chatConnector, setMessages]);

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
      setShouldScrollToBottom(false);
    }
  }, [messages, shouldScrollToBottom]);

  useEffect(() => {
    function restoreScrollPosition() {
      document.documentElement.scrollTop =
        prevTopmostMessageRef.current.offsetTop - prevOffsetTop;
    }

    const isLoadedNewPage =
      prevTopmostMessageRef.current &&
      topmostMessageRef.current &&
      prevTopmostMessageRef.current !== topmostMessageRef.current;

    if (isLoadedNewPage) {
      restoreScrollPosition();
    }
  }, [messages, topmostMessageRef, prevTopmostMessageRef, prevOffsetTop]);

  useEffect(focusOnInput, []);

  function focusOnInput() {
    inputRef.current?.focus();
  }

  function handleSubmit(e) {
    focusOnInput();
    const input = e.target.elements.message;
    const messageText = input.value;
    if (!messageText) {
      return;
    }

    input.value = "";
    setIsSending(true);
    post("/api/message", {
      text: messageText,
      chatId,
    })
      .catch(err => {
        throw new PaybackError("Failed to send a message", err);
      })
      .finally(() => {
        setIsSending(false);
      });
  }

  function handleMessageInsideBounds(message) {
    if (message.userId == userId || message.wasRead) {
      return;
    }

    flushSync(() => {
      setMessages(
        messages.map(m =>
          m.id == message.id ? { ...message, wasRead: true } : m
        )
      );
    });

    put(`/api/message?id=${message.id}`, { wasRead: true });
  }

  const messagesList = messages
    ?.map((m, _, messages) => (
      <Message
        key={m.id}
        message={m}
        userId={userId}
        topBound={0}
        bottomBound={inputRef.current?.getBoundingClientRect().top ?? 370} // fixme: remove hardcoded value
        onInsideBounds={() => handleMessageInsideBounds(m)}
        ref={m === messages.at(-1) ? topmostMessageRef : undefined}
      />
    ))
    .reverse();

  return (
    <div className={styles.container}>
      <ul className={styles.messages}>{messagesList}</ul>

      <Form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Message"
          name="message"
          ref={inputRef}
        />
        <button
          className={styles.send}
          aria-label="send message"
          disabled={isSending}
        >
          <RiSendPlaneFill />
        </button>
      </Form>
    </div>
  );
}

export default withDataFetching(
  Chat,
  ({ chatId }, _, pageCursor) =>
    get(`/api/message?chatId=${chatId}&pageCursor=${pageCursor}`),
  props => ({ chatId: props.chatId }),
  true,
  undefined,
  false
);
