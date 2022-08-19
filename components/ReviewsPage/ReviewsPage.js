import Rating from "components/Rating";
import Subpage from "components/Subpage";
import ReviewList from "components/ReviewList";
import Loading from "components/Loading";
import { get } from "lib/api/client";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function ReviewsPage({ id }) {
  const [user, setUser] = useState();

  useEffect(() => {
    get(`/api/user?id=${id}`).then(setUser);
  }, [id]);

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
        <ReviewList reviews={user.products.reviews} />
      </Subpage>
    </>
  );
}
