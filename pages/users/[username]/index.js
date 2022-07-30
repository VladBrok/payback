import styles from "./index.module.scss";
import Subpage from "../../../components/Subpage";
import User from "../../../components/User";
import Section from "../../../components/Section";
import ProductList from "../../../components/ProductList";
import users from "../../../data/users";
import { byId } from "../../../lib/userFinders";
import { byUserId } from "../../../lib/productFilters";
import { useRouter } from "next/router";
import Link from "next/link";

export default function UserPage() {
  const router = useRouter();
  const { username } = router.query;
  if (username == undefined) {
    return;
  }

  const user = users.find(byId(username));

  return (
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
      <Section title="Products">
        <ProductList filter={byUserId(username)} />
      </Section>
    </Subpage>
  );
}
