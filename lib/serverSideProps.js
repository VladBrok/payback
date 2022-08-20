import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

export async function getServerSideSessionUser({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  return {
    props: {
      sessionUser: session?.user ?? null,
    },
  };
}
