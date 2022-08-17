import Rating from "components/Rating";
import Subpage from "components/Subpage";
import ReviewList from "components/ReviewList";
import Loading from "components/Loading";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ReviewsPage() {
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
        <title>{user.name} reviews</title>
      </Head>

      <Subpage
        title={
          <Rating
            reviewCount={user.reviewCount}
            value={user.rating}
            valueFontSize="2rem"
          />
        }
      >
        <ReviewList sellerId={id} />
      </Subpage>
    </>
  );
}
