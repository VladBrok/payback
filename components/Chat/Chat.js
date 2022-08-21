import styles from "./Chat.module.scss";
import Form from "components/Form";
import Message from "components/Message";
import withDataFetching from "components/withDataFetching";
import { PaybackError } from "lib/errors";
import { get, post, put } from "lib/api/client";
import { isScrolledToBottom, scrollToBottom } from "lib/document";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

function Chat({
  userId,
  chatId,
  onMessageInsideBounds,
  chatConnector = undefined,
  fetchedData: messages,
  setFetchedData: setMessages,
}) {
  const inputRef = useRef();
  const [bottomBound, setBottomBound] = useState();
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  useEffect(() => {
    function handleMessage(message) {
      setShouldScrollToBottom(message.userId == userId || isScrolledToBottom());
      setMessages(cur => (cur ? [...cur, message] : [message]));
    }

    return chatConnector.connectToMessages?.(chatId, handleMessage);
  }, [chatId, userId, chatConnector]);

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
    }
  }, [messages, shouldScrollToBottom]);

  useEffect(() => {
    setBottomBound(inputRef.current?.getBoundingClientRect().top);
  }, []);

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
    post("/api/message", {
      text: messageText,
      chatId,
    }).catch(err => {
      throw new PaybackError("Failed to send a message", err);
    });
  }

  function handleMessageInsideBounds(message) {
    if (message.userId == userId || message.wasRead) {
      return;
    }

    onMessageInsideBounds(message);
    flushSync(() => {
      setMessages(
        messages.map(m =>
          m.id == message.id ? { ...message, wasRead: true } : m
        )
      );
    });

    put(`/api/message?id=${message.id}`, { wasRead: true });
  }

  const messagesList = bottomBound
    ? messages?.map(m => (
        <Message
          key={m.id}
          message={m}
          userId={userId}
          topBound={0}
          bottomBound={bottomBound}
          onInsideBounds={() => handleMessageInsideBounds(m)}
        />
      ))
    : null;

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
        <button className={styles.send} aria-label="send message">
          <RiSendPlaneFill />
        </button>
      </Form>
    </div>
  );
}

export default withDataFetching(
  Chat,
  ({ chatId }) => get(`/api/message?chatId=${chatId}`),
  props => ({ chatId: props.chatId }),
  true
);
