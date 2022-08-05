import styles from "./Chat.module.scss";
import Form from "components/Form";
import Message from "components/Message";
import { connect } from "lib/chat/client";
import { post } from "lib/api";
import { makeMessage } from "lib/chat/makeMessage";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

export default function Chat({ useId }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);
  const inputRef = useRef();

  useEffect(() =>  connect(
      { name: useId },
      message => {
        setMessages(current => [...current, message]);
      },
      error => handleError(error, "connect")
    );
  , []);

  useEffect(() => {
    body.scroll(0, body.scrollHeight); // fixme: scroll only if a user is in the bottom
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
      <ul className={styles.messages}>
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
        <button className={styles.send} aria-label="send message">
          <RiSendPlaneFill />
        </button>
      </Form>
    </>
  );
}
