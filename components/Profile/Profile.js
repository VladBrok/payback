import styles from "./Profile.module.scss";
import User from "components/User";
import Rating from "components/Rating";
import MenuItem from "components/MenuItem";
import CurrentBalance from "components/CurrentBalance";
import ReviewLink from "components/ReviewLink";
import withDataFetching from "components/withDataFetching";
import { get } from "lib/api/client";
import profileMenuItems from "data/profileMenuItems.json";
import Head from "next/head";
import { useRouter } from "next/router";

function Profile({ children, fetchedData: user }) {
  const pathname = useRouter().pathname;

  function isActive(item) {
    return pathname.includes(item);
  }

  const menuItems = profileMenuItems.map(item => (
    <MenuItem
      key={item}
      isActive={isActive(item)}
      name={isActive(item) ? <h2>{item}</h2> : item}
      href={`/profile/${item}`}
      className={styles["menu-item"]}
    />
  ));

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

export default withDataFetching(
  Profile,
  ({ id }) => get(`/api/user?id=${id}`),
  props => ({ id: props.sessionUser.id })
);
