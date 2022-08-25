import { getReviews } from "lib/db/review";
import { getUser } from "lib/db/user";
import { withServerProps } from "lib/serverSide";

export { default } from "components/ReviewsPage";

export async function getServerSideProps(context) {
  const userId = +context.query.id;

  return withServerProps(
    () => ({
      id: userId,
      data: () => getUser(userId),
      reviews: () => getReviews(userId),
    }),
    context
  );
}
