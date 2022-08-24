import Loading from "components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Auth({ children }) {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/profile/signIn");
    },
  });

  // fixme: use ssr
  if (session.status === "loading") {
    console.log("auth");
    return <Loading />;
  }

  return children;
}
