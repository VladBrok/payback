export { default } from "components/CategoryPage";

export function getServerSideProps(context) {
  const id = +context.query.id;

  return {
    props: {
      id,
    },
  };
}
