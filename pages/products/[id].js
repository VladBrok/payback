export { default } from "components/ProductPage";

export function getServerSideProps(context) {
  return {
    props: {
      id: +context.query.id,
    },
  };
}
