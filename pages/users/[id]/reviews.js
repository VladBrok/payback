import { getReviews } from "lib/db/review";
import { getUser } from "lib/db/user";
import { fetchServerSide } from "lib/serverSide";

export { default } from "components/ReviewsPage";

export async function getServerSideProps(context) {
  const userId = +context.query.id;
  const result = await fetchServerSide(() => getUser(userId));
  if (result.notFound) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: userId,
      data: result.data,
      reviews: (await fetchServerSide(() => getReviews(userId))).data,
    },
  };
}
