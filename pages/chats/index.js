import styles from "./index.module.scss";
import User from "components/User";
import chatData from "data/chats.json";
import { byUserEmail } from "lib/chatFilters";
import { FcApproval } from "react-icons/fc";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

function ChatsPage() {
  const {
    data: { user },
  } = useSession();

  const chats = chatData.filter(byUserEmail(user.email)).map(d => (
    <li key={d.id}>
      <Link href={`/chats/${d.id}`}>
        <a>
          <User
            name={
              <span className={styles.username}>
                {d.name} <FcApproval className={styles.icon} />
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

      <h1 className={styles.title}>Chats</h1>
      <ul className={styles.list}>{chats}</ul>
    </>
  );
}

ChatsPage.auth = true;
export default ChatsPage;
