import Rating from "components/Rating";
import Router from "components/Router";
import Subpage from "components/Subpage";
import ReviewList from "components/ReviewList";
import users from "data/users.json";
import { byId } from "lib/userFinders";
import Head from "next/head";

export default function ReviewsPage() {
  return (
    <Router>
      {({ username }) => {
        const user = users.find(byId(username));

        return (
          <>
            <Head>
              <title>{username} reviews</title>
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
              <ReviewList sellerId={username} />
            </Subpage>
          </>
        );
      }}
    </Router>
  );
}
