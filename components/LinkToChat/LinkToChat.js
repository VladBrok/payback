import utilStyles from "styles/utils.module.scss";
import { makeChatId } from "lib/chat/makeChatId";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function LinkToChat({
  chatId = null,
  userId = null,
  children = "Write a message",
  className = utilStyles["button-tertiary"],
  ...props
}) {
  const session = useSession();
  const user = session.data?.user;
  if (session.state === "loading") {
    return;
  }

  const id = chatId ?? makeChatId([userId, user?.email]);
  const href = user ? `/chats?id=${id}` : "/chats";

  return (
    <Link href={href} {...props}>
      <a className={className}>{children}</a>
    </Link>
  );
}
