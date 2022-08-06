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
      {({ id }) => {
        const user = users.find(byId(id));
        const name = user.login?.username ?? user.name;

        return (
          <>
            <Head>
              <title>{name} reviews</title>
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
      }}
    </Router>
  );
}
