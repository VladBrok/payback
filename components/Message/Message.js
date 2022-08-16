import styles from "./Message.module.scss";
import { formatDistanceToNow } from "lib/date";
import { isInsideVerticalBounds } from "lib/document";
import { useEffect, useRef } from "react";

export default function Message({
  message,
  userId,
  topBound,
  bottomBound,
  onInsideBounds,
}) {
  const elementRef = useRef();

  useEffect(() => {
    function handleScroll() {
      if (isInsideVerticalBounds(elementRef.current, topBound, bottomBound)) {
        onInsideBounds();
      }
    }

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [topBound, bottomBound]);

  // fixme: remove info message because it's not used ?
  const style = !message.userId
    ? "info-message"
    : message.userId == userId
    ? "message-from-me"
    : "message-from-friend";

  return (
    <li className={styles[style]} ref={elementRef}>
      <header>
        <span className={styles.time}>{formatDistanceToNow(message.time)}</span>
      </header>
      <p>{message.text}</p>
    </li>
  );
}
