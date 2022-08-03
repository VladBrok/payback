import utilStyles from "styles/utils.module.scss";
import Subpage from "components/Subpage";
import User from "components/User";
import ProductList from "components/ProductList";
import Empty from "components/Empty";
import Router from "components/Router";
import Rating from "components/Rating";
import users from "data/users";
import { byId } from "lib/userFinders";
import { byUserId } from "lib/productFilters";
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
                <User name={username} imageUrl={user.picture.large}>
                  <Rating
                    value={user.rating}
                    reviewCount={user.reviewCount}
                    reviewWrapper={children => (
                      <Link href={`/users/${username}/reviews`}>
                        <a className={utilStyles["button-tertiary"]}>
                          {children}
                        </a>
                      </Link>
                    )}
                  />
                </User>
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
