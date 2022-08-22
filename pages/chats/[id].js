export { default } from "components/ChatPage";

export function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id,
    },
  };
}
