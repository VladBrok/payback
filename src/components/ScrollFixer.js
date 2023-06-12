import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";

export default function ScrollFixer({ children }) {
  const router = useRouter();
  const isBackRef = useRef(false);

  const shouldUpdateScroll = useCallback(() => {
    if (isBackRef.current) {
      isBackRef.current = false;
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    router.beforePopState(() => {
      isBackRef.current = true;
      return true;
    });
  }, [router]);

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events, shouldUpdateScroll]);

  return <>{children}</>;
}
