import styles from "./Chat.module.scss";
import Form from "components/Form";
import Message from "components/Message";
import { connect } from "lib/chat/client";
import { post } from "lib/api";
import { makeMessage } from "lib/chat/makeMessage";
import Pusher from "pusher-js";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Chat({ userId }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const inputRef = useRef();
  const pusher = useMemo(() => {
    console.log("memo");
    return new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
  }, []);

  useEffect(
    () =>
      connect(
        pusher,
        userId,
        message => {
          setShouldScrollToBottom(
            isScrolledToBottom() || message.from == userId
          );
          setMessages(current => [...current, message]);
        },
        error => handleError(error, "connect")
      ),
    []
  );
  useEffect(() => {
    if (shouldScrollToBottom) {
      doc().scroll(0, doc().scrollHeight);
    }
  }, [messages]);
  useEffect(focusOnInput, []);

  function isScrolledToBottom() {
    return (
      Math.abs(doc().scrollHeight - doc().scrollTop - doc().offsetHeight) <= 3
    );
  }

  function doc() {
    return document.documentElement;
  }

  function focusOnInput() {
    inputRef.current?.focus();
  }

  function handleError(error, cause) {
    console.log(error, `CAUSED BY: ${cause}`);
    setError(true);
  }

  function handleSubmit(e) {
    focusOnInput();
    const input = e.target.elements.message;
    const messageText = input.value;
    if (!messageText) {
      return;
    }

    input.value = "";
    post("send-message", makeMessage(messageText, userId)).catch(() =>
      handleError(error, "post request")
    );
  }

  const messagesList = messages.map(m => (
    <Message message={m} userId={userId} key={m.id} />
  ));

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
