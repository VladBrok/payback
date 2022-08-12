import utilStyles from "styles/utils.module.scss";
import Subpage from "components/Subpage";
import User from "components/User";
import ProductList from "components/ProductList";
import Empty from "components/Empty";
import Rating from "components/Rating";
import LinkToChat from "components/LinkToChat";
import Loading from "components/Loading";
import { byUserId } from "lib/productFilters";
import { FcInTransit } from "react-icons/fc";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UserPage() {
  // fixme: dup with reviews.js
  // fixme: use getServerSideProps ?
  const [user, setUser] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    fetch(`/api/user?id=${id}`).then(async res => setUser(await res.json()));
  }, [router.isReady, id]);

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{user.name}</title>
      </Head>

      <Subpage
        title={
          <User name={user.name} imageUrl={user.image}>
            <Rating
              value={user.rating}
              reviewCount={user.reviews.length}
              reviewWrapper={children => (
                <Link href={`/users/${id}/reviews`}>
                  <a className={utilStyles["button-tertiary"]}>{children}</a>
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
}
