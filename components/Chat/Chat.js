import styles from "./Chat.module.scss";
import Form from "components/Form";
import Message from "components/Message";
import { connect } from "lib/chat/client";
import { post } from "lib/api";
import { makeMessage } from "lib/chat/makeMessage";
import { useEffect, useRef, useState } from "react";

export default function Chat({ useId }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);
  const messagesRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    return connect(
      { name: useId },
      message => {
        setMessages(current => [...current, message]);
      },
      error => handleError(error, "connect")
    );
  }, []);

  useEffect(() => {
    messagesRef.current.scroll(0, messagesRef.current.scrollHeight); // fixme: scroll only if a user is in the bottom
  }, [messages]);

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
    post("send-message", makeMessage(messageText, useId)).catch(() =>
      handleError(error, "post request")
    );
  }

  const messagesList = messages.map(m => (
    <Message message={m} userId={useId} key={m.id} />
  ));

  return (
    <>
      <ul className={styles.messages} ref={messagesRef}>
        {messagesList}
      </ul>

      <Form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Message"
          name="message"
          ref={inputRef}
        />
        <button className={styles.send}>Send</button>
      </Form>
    </>
  );
}
