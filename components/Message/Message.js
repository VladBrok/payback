import styles from "./Message.module.scss";

export default function Message({ message, username }) {
  const style = !message.from
    ? "info-message"
    : message.from === username
    ? "message-from-me"
    : "message-from-friend";

  return (
    <li className={styles[style]}>
      <header>
        <span className={styles.time}>{message.time}</span>
      </header>
      <p>{message.text}</p>
    </li>
  );
}
