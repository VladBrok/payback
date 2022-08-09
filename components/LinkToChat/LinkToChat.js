import utilStyles from "styles/utils.module.scss";
import { makeChatId } from "lib/chat/chatId";
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
  if (session.status === "loading") {
    return;
  }

  const id = chatId ?? makeChatId([userId, user?.id]);
  const href =
    session.status === "authenticated" ? `/chats?id=${id}` : "/chats";

  return (
    <Link href={href} {...props}>
      <a className={className}>{children}</a>
    </Link>
  );
}
