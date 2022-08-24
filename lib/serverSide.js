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
  let data = null;
  let error = false;
  try {
    data = await fetcher();
  } catch (err) {
    console.log(err);
    error = true;
  }

  return { data: JSON.parse(stringify(data)).json, error };
}
