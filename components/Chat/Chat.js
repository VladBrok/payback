import styles from "./Chat.module.scss";
import Form from "components/Form";
import Message from "components/Message";
import { PaybackError } from "lib/errors";
import { post } from "lib/api/client";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

export default function Chat({
  userId,
  chatId,
  channelName,
  messages,
  onMessageInsideBounds,
}) {
  const inputRef = useRef();
  const [bottomBound, setBottomBound] = useState();

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
    post("/api/message", { text: messageText, chatId, channelName }).catch(
      err => {
        throw new PaybackError("Failed to send a message", err);
      }
    );
  }

  const messagesList = bottomBound
    ? messages.map(m => (
        <Message
          key={m.id}
          message={m}
          userId={userId}
          topBound={0}
          bottomBound={bottomBound}
          onInsideBounds={() => onMessageInsideBounds(m)}
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
