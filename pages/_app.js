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

const NOTIFICATION_LIFETIME_MS = 10000000;

export default function MyApp({ Component: Page, pageProps }) {
  const [error, setError] = useState();
  const pathname = useRouter().pathname;

  useEffect(() => {
    function handleError(e) {
      const isCustom = e.reason.name === "PaybackError";
      const message = isCustom ? e.reason.message : "Please try again later";
      const title = isCustom ? "Error" : "Failed to load data";

      if (isCustom) {
        console.log("Error caused by: ", e.reason.cause.message);
      }

      if (!error || error !== message) {
        NotificationManager.error(message, title, NOTIFICATION_LIFETIME_MS);
      }

      flushSync(() => setError(message));
    }

    window.addEventListener("unhandledrejection", handleError);
    return () => window.removeEventListener("unhandledrejection", handleError);
  }, [error]);

  useEffect(() => {
    setError();
    NotificationManager.removeAll();
  }, [pathname]);

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/images/logo-small.png" />
      </Head>

      <ErrorProvider value={Boolean(error)}>
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
