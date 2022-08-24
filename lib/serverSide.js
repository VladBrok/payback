import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { stringify } from "superjson";

export async function getServerSideSessionUser({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  return {
    props: {
      sessionUser: session?.user ?? null,
    },
  };
}

export async function fetchServerSide(fetcher) {
  let data;
  try {
    data = await fetcher();
  } catch (err) {
    console.log(err);
    data = null;
  }

  return JSON.parse(stringify(data)).json;
}
