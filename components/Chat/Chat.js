import styles from "./Chat.module.scss";
import Form from "components/Form";
import Message from "components/Message";
import { post } from "lib/api";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

export default function Chat({ userId, chatId, messages }) {
  const [error, setError] = useState(false);
  const inputRef = useRef();

  useEffect(focusOnInput, []);

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
    post("message", { text: messageText, userId, chatId }).catch(() =>
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
