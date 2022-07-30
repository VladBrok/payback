import { useRouter } from "next/router";

export default function Router({ children }) {
  const router = useRouter();

  if (!router.isReady) {
    return;
  }

  return <>{children(router.query)}</>;
}
