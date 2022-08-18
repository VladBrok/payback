export { default } from "components/ReviewsPage";

export function getServerSideProps(context) {
  return {
    props: {
      id: +context.query.id,
    },
  };
}
