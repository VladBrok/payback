export { default } from "components/CategoryPage";

export function getServerSideProps(context) {
  return {
    props: {
      id: +context.query.id,
    },
  };
}
