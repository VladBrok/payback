import styles from "./Message.module.scss";
import { formatDistanceToNow } from "lib/date";

export default function Message({ message, userId }) {
  // fixme: remove info message because it's not used ?
  const style = !message.userId
    ? "info-message"
    : message.userId == userId
    ? "message-from-me"
    : "message-from-friend";

  return (
    <li className={styles[style]}>
      <header>
        <span className={styles.time}>{formatDistanceToNow(message.time)}</span>
      </header>
      <p>{message.text}</p>
    </li>
  );
}
