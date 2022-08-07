import utilStyles from "styles/utils.module.scss";
import Subpage from "components/Subpage";
import User from "components/User";
import ProductList from "components/ProductList";
import Empty from "components/Empty";
import Router from "components/Router";
import Rating from "components/Rating";
import LinkToChat from "components/LinkToChat";
import users from "data/users";
import { byId } from "lib/userFinders";
import { byUserId } from "lib/productFilters";
import { FcInTransit } from "react-icons/fc";
import Link from "next/link";
import Head from "next/head";

export default function UserPage() {
  return (
    <Router>
      {({ id }) => {
        const user = users.find(byId(id));
        const name = user.login?.username ?? user.name;

        return (
          <>
            <Head>
              <title>{name}</title>
            </Head>

            <Subpage
              title={
                <User name={name} imageUrl={user.picture.large}>
                  <Rating
                    value={user.rating}
                    reviewCount={user.reviewCount}
                    reviewWrapper={children => (
                      <Link href={`/users/${id}/reviews`}>
                        <a className={utilStyles["button-tertiary"]}>
                          {children}
                        </a>
                      </Link>
                    )}
                  />
                  <LinkToChat userId={id} />
                </User>
              }
            >
              <ProductList
                filter={byUserId(id)}
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
