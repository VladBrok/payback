import { getServerSideSessionUser } from "lib/serverSide";

export { default } from "components/UserPage";

export async function getServerSideProps(context) {
  const requestedUserId = +context.query.id;
  const sessionUser = (await getServerSideSessionUser(context)).props
    .sessionUser;

  if (sessionUser?.id == requestedUserId) {
    return {
      redirect: {
        destination: "/profile/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      id: requestedUserId,
    },
  };
}
