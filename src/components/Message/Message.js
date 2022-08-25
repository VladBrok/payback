import styles from "./Message.module.scss";
import { formatDistanceToNow } from "lib/date";
import { checkIfInsideBounds } from "lib/document";
import { forwardRef, useEffect, useRef } from "react";

function Message(
  { message, userId, topBound, bottomBound, onInsideBounds },
  ref
) {
  const elementRef = useRef();

  useEffect(() => {
    if (ref) {
      ref.current = elementRef.current;
    }
  });

  useEffect(() => {
    function handleScroll() {
      checkIfInsideBounds(
        elementRef.current,
        topBound,
        bottomBound,
        onInsideBounds
      );
    }

    const timeoutId = setTimeout(handleScroll);
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [topBound, bottomBound, onInsideBounds]);

  const style =
    message.userId == userId ? "message-from-me" : "message-from-friend";

  return (
    <li className={styles[style]} ref={elementRef}>
      <header>
        <span className={styles.time}>{formatDistanceToNow(message.time)}</span>
      </header>
      <p>{message.text}</p>
    </li>
  );
}

export default forwardRef(Message);
