import styles from "./ProfilePage.module.scss";
import User from "components/User";
import Rating from "components/Rating";
import MenuItem from "components/MenuItem";
import Router from "components/Router";
import profileMenuItems from "data/profileMenuItems.json";
import Head from "next/head";
import { useSession } from "next-auth/react";

function ProfilePage({ children }) {
  const {
    data: { user },
  } = useSession();

  return (
    <>
      {/* todo: add Head to the subpage ? */}
      <Head>
        <title>{user.name}</title>
      </Head>

      {/* fixme: use Subpage (without go back button) ? */}
      <header>
        <h1 className={styles.title}>Profile</h1>
      </header>

      <main className={styles.container}>
        <User name={user.name} imageUrl={user.image}>
          {/* fixme: get it from db */}
          <Rating reviewCount={0} value={0} />
        </User>

        <Router>
          {(_, pathname) => {
            const menuItems = profileMenuItems.map(item => (
              <MenuItem
                key={item}
                isActive={pathname.includes(item)}
                name={item}
                href={`/profile/${item}`}
                className={styles["menu-item"]}
              />
            ));

            return <div className={styles.menu}>{menuItems}</div>;
          }}
        </Router>

        {typeof children === "function" ? children(user) : children}
      </main>
    </>
  );
}

ProfilePage.auth = true;
export default ProfilePage;
