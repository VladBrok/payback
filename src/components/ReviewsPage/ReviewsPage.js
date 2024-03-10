import Rating from "components/Rating";
import ReviewList from "components/ReviewList";
import Subpage from "components/Subpage";
import withDataFetching from "components/withDataFetching";
import { get } from "lib/api/client";
import Head from "next/head";

function ReviewsPage({ fetchedData: user, reviews }) {
  return (
    <>
      <Head>
        <title>Reviews about {user.name}</title>
      </Head>

      <Subpage
        title={
          <Rating
            reviewCount={user.reviewCount}
            value={user.rating}
            valueFontSize="2rem"
            reviewWrapper={review => <h1>{review}</h1>}
          />
        }
      >
        <ReviewList userId={user.id} data={reviews} />
      </Subpage>
    </>
  );
}

export default withDataFetching(
  ReviewsPage,
  ({ id }) => get(`/api/user?id=${id}`),
  props => ({ id: props.id })
);
