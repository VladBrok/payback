import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { stringify } from "superjson";

export async function withServerProps(
  getProps,
  context = undefined,
  requireAuth = false
) {
  if (requireAuth && !context) {
    throw new Error("context must be provided if requireAuth is true");
  }

  let sessionUser;
  if (requireAuth) {
    sessionUser = await getSessionUser(context);
    if (!sessionUser) {
      return {
        redirect: {
          destination: "/profile/signIn",
          permanent: false,
        },
      };
    }
  }

  const initialProps = getProps(sessionUser);
  const props = {};

  for (const [name, value] of Object.entries(initialProps)) {
    if (typeof value === "function") {
      const fetcher = value;
      const fetchResult = await fetchServerSide(() => fetcher(props));
      console.log(fetchResult);
      if (fetchResult.notFound) {
        return {
          notFound: true,
        };
      }

      props[name] = fetchResult.data;
    } else {
      props[name] = value;
    }
  }

  return {
    props,
  };
}

export async function getSessionUser({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  return session?.user ?? null;
}

async function fetchServerSide(fetcher) {
  let data = null;
  let error = false;
  try {
    data = await fetcher();
  } catch (err) {
    console.log(err);
    error = true;
  }

  return {
    data: JSON.parse(stringify(data)).json,
    error,
    notFound: !data && !error,
  };
}
