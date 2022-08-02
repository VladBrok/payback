import Loading from "components/Loading";
import { useSession } from "next-auth/react";

export default function Auth({ children }) {
  const session = useSession({ required: true });

  if (session.status === "loading") {
    return <Loading />;
  }

  return children;
}
