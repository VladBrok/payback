import styles from "./index.module.scss";
import Subpage from "../../../components/Subpage";
import User from "../../../components/User";
import ProductList from "../../../components/ProductList";
import Empty from "../../../components/Empty";
import Router from "../../../components/Router";
import users from "../../../data/users";
import { byId } from "../../../lib/userFinders";
import { byUserId } from "../../../lib/productFilters";
import { FcInTransit } from "react-icons/fc";
import Link from "next/link";
import Head from "next/head";

export default function UserPage() {
  return (
    <Router>
      {({ username }) => {
        const user = users.find(byId(username));

        return (
          <>
            <Head>
              <title>{username}</title>
            </Head>
            <Subpage
              title={
                <User
                  name={username}
                  imageUrl={user.picture.large}
                  rating={user.rating}
                  reviewCount={user.reviewCount}
                  reviewWrapper={children => (
                    <Link href={`/users/${username}/reviews`}>
                      <a className={styles.link}>{children}</a>
                    </Link>
                  )}
                />
              }
            >
              <ProductList
                filter={byUserId(username)}
                includeCategory={false}
                fallback={
                  <Empty
                    title="No products"
                    Icon={FcInTransit}
                    hint="come back later"
                  />
                }
              />
            </Subpage>
          </>
        );
      }}
    </Router>
  );
}
