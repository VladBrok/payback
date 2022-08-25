import "styles/globals.scss";
import "react-notifications/lib/notifications.css";
import Menu from "components/Menu";
import Container from "components/Container";
import { SessionUserProvider } from "context/SessionUser";
import ProgressBar from "@badrap/bar-of-progress";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import router, { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

const NOTIFICATION_LIFETIME_MS = 10000000;

export default function MyApp({ Component: Page, pageProps }) {
  const [error, setError] = useState();
  const pathname = useRouter().pathname;

  console.log(pageProps);

  useEffect(() => {
    function handleError(e) {
      e.preventDefault();
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
    NotificationManager.removeAll();
    setError();
  }, [pathname]);

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/images/logo-small.png" />
        <meta name="description" content="Buy and sell products on Payback - fully-featured e-commerce store." />
      </Head>

      <SessionUserProvider value={pageProps.sessionUser}>
        <Container>
          <Page {...pageProps} />
        </Container>
        <Menu activePath={pathname} />
        <NotificationContainer />
      </SessionUserProvider>
    </>
  );
}

const progress = new ProgressBar({
  delay: 500,
});
router.events.on("routeChangeStart", progress.start);
router.events.on("routeChangeComplete", progress.finish);
router.events.on("routeChangeError", progress.finish);
