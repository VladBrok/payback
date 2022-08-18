export { default } from "components/UserPage";

export function getServerSideProps(context) {
  return {
    props: {
      id: +context.query.id,
    },
  };
}
