import styles from "./ProfilePage.module.scss";
import User from "components/User";
import Rating from "components/Rating";
import MenuItem from "components/MenuItem";
import CurrentBalance from "components/CurrentBalance";
import ReviewLink from "components/ReviewLink";
import Loading from "components/Loading";
import { get } from "lib/api/client";
import profileMenuItems from "data/profileMenuItems.json";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ProfilePage({ children }) {
  const [user, setUser] = useState();
  const session = useSession();
  const userId = session.data.user.id;
  const pathname = useRouter().pathname;

  useEffect(() => {
    get(`/api/user?id=${userId}`).then(setUser);
  }, [userId]);

  const menuItems = profileMenuItems.map(item => (
    <MenuItem
      key={item}
      isActive={pathname.includes(item)}
      name={item}
      href={`/profile/${item}`}
      className={styles["menu-item"]}
    />
  ));

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{user.name}</title>
      </Head>

      <header>
        <h1 className={styles.title}>Profile</h1>
      </header>

      <main className={styles.container}>
        <User name={user.name} imageUrl={user.image}>
          <Rating
            reviewCount={user.reviewCount}
            value={user.rating}
            reviewWrapper={children => (
              <ReviewLink userId={user.id}>{children}</ReviewLink>
            )}
          />
          <CurrentBalance money={user.money} />
        </User>
        <div className={styles.menu}>{menuItems}</div>
        {typeof children === "function" ? children(user) : children}
      </main>
    </>
  );
}

ProfilePage.auth = true;
export default ProfilePage;
