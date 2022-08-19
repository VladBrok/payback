import "styles/globals.scss";
import "react-notifications/lib/notifications.css";
import Menu from "components/Menu";
import Container from "components/Container";
import Auth from "components/Auth";
import ErrorProvider from "context/ErrorContext";
import ProgressBar from "@badrap/bar-of-progress";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { SessionProvider } from "next-auth/react";
import router, { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

const progress = new ProgressBar({
  delay: 100,
});
router.events.on("routeChangeStart", progress.start);
router.events.on("routeChangeComplete", progress.finish);
router.events.on("routeChangeError", progress.finish);

export default function MyApp({ Component: Page, pageProps }) {
  const [error, setError] = useState(false);
  const pathname = useRouter().pathname;

  useEffect(() => {
    function handleError() {
      if (!error) {
        NotificationManager.error(
          "Please try again later",
          "Failed to load data",
          Number.MAX_SAFE_INTEGER
        );
      }
      flushSync(() => setError(true));
    }

    window.addEventListener("unhandledrejection", handleError);
    return () => window.removeEventListener("unhandledrejection", handleError);
  }, [error]);

  useEffect(() => {
    setError(false);
    NotificationManager.removeAll();
  }, [pathname]);

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/images/logo-small.png" />
      </Head>
      <ErrorProvider value={error}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Container>
            {Page.auth ? (
              <Auth>
                <Page {...pageProps} />
              </Auth>
            ) : (
              <Page {...pageProps} />
            )}
          </Container>
          <Menu activePath={pathname} />
          <NotificationContainer />
        </SessionProvider>
      </ErrorProvider>
    </>
  );
}
