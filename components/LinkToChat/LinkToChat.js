import styles from "./LinkToChat.module.scss";
import User from "components/User";
import NewMessages from "components/NewMessages";
import Link from "next/link";
import { FcApproval } from "react-icons/fc";
import { useMemo } from "react";

export default function LinkToChat({ chat, userId }) {
  const newMessageCount = useMemo(
    () => chat.messages.filter(m => !m.wasRead && m.userId != userId).length,
    [chat.messages, userId]
  );

  return (
    <Link href={`/chats?id=${chat.id}`} shallow>
      <a className={styles.container}>
        <User
          name={
            <span className={styles.username}>
              {chat.name}{" "}
              {chat.isVerified && <FcApproval className={styles.icon} />}{" "}
              <NewMessages count={newMessageCount} />
            </span>
          }
          imageUrl={chat.image}
        />
      </a>
    </Link>
  );
}
