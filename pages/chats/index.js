import styles from "./index.module.scss";
import User from "components/User";
import Router from "components/Router";
import Subpage from "components/Subpage";
import Chat from "components/Chat";
import NewMessages from "components/NewMessages";
import chatData from "data/chats.json";
import { byId } from "lib/chatFinders";
import { byUserId } from "lib/chatFilters";
import { FcApproval } from "react-icons/fc";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

function ChatsPage() {
  const {
    data: { user },
  } = useSession();

  // fixme: use id instead of an email (requires db)
  const chats = chatData.filter(byUserId(user.email)).map(d => (
    <li key={d.id}>
      <Link href={`/chats?id=${d.id}`} shallow>
        <a className={styles["user-container"]}>
          <User
            name={
              <span className={styles.username}>
                {d.name} <FcApproval className={styles.icon} />{" "}
                <NewMessages count={1} />
              </span>
            }
            imageUrl={d.image}
          />
        </a>
      </Link>
    </li>
  ));

  return (
    <>
      <Head>
        <title>Chats</title>
      </Head>

      <Router>
        {({ id: chatId }) => {
          if (chatId == undefined) {
            return (
              <>
                <h1 className={styles.title}>Chats</h1>
                <ul className={styles.list}>{chats}</ul>
              </>
            );
          }

          const chat = chatData.find(byId(chatId));
          return (
            <Subpage title={chat.name}>
              <Chat userId={user.email} /> {/* fixme: use id */}
            </Subpage>
          );
        }}
      </Router>
    </>
  );
}

ChatsPage.auth = true;
export default ChatsPage;
