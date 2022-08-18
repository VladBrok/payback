export { default } from "components/ChatsPage";

export async function getServerSideProps(ctx) {
  console.log(ctx.query);
  return {
    props: {},
  };
}
