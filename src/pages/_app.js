import "styles/globals.scss";
import Menu from "components/Menu";
import Container from "components/Container";
import { SessionUserProvider } from "context/SessionUser";
import {
  startProgressAnimation,
  finishProgressAnimation,
} from "lib/progressBar";
import router, { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { SITE_DESCRIPTION } from "lib/sharedConstants";

export default function App({ Component: Page, pageProps }) {
  const [error, setError] = useState();
  const [notificationContainer, setNotificationContainer] = useState();
  const pathname = useRouter().pathname;

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
        flushSync(() => setError(message));
        notify(message, title);
      } else {
        flushSync(() => setError(message));
      }
    }

    window.addEventListener("unhandledrejection", handleError);
    return () => window.removeEventListener("unhandledrejection", handleError);
  }, [error]);

  useEffect(() => {
    setError();
  }, [pathname]);

  async function notify(message, title) {
    if (!notificationContainer) {
      await import("react-notifications/lib/notifications.css")
        .then(() => import("react-notifications"))
        .then(({ NotificationContainer }) => {
          flushSync(() => setNotificationContainer(<NotificationContainer />));
        });
    }

    const { NotificationManager } = await import("react-notifications");
    const LIFETIME_MS = 10000000;
    NotificationManager.error(message, title, LIFETIME_MS);
  }

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/images/logo-small.png" />
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta
          property="og:title"
          content="Payback - a fully-featured e-commerce store"
        />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://payback-store.vercel.app/images/og-image.png"
        />
        <meta property="og:url" content="https://payback-store.vercel.app" />
      </Head>

      <SessionUserProvider value={pageProps.sessionUser}>
        <Container>
          <Page {...pageProps} />
        </Container>
        <Menu activePath={pathname} />
        {notificationContainer}
      </SessionUserProvider>
    </>
  );
}

router.events.on("routeChangeStart", startProgressAnimation);
router.events.on("routeChangeComplete", finishProgressAnimation);
router.events.on("routeChangeError", finishProgressAnimation);
