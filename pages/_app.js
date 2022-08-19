import "styles/globals.scss";
import Menu from "components/Menu";
import Container from "components/Container";
import Auth from "components/Auth";
import ErrorProvider from "context/ErrorContext";
import ProgressBar from "@badrap/bar-of-progress";
import { SessionProvider } from "next-auth/react";
import router, { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";

const progress = new ProgressBar({
  delay: 100,
});
router.events.on("routeChangeStart", progress.start);
router.events.on("routeChangeComplete", progress.finish);
router.events.on("routeChangeError", progress.finish);

export default function MyApp({ Component: Page, pageProps }) {
  const [error, setError] = useState(false);
  const pathname = useRouter().pathname;
  console.log("_app has error:", error, pathname);

  useEffect(() => {
    function handleError() {
      setError(true);
    }

    window.addEventListener("unhandledrejection", handleError);
    return () => window.removeEventListener("unhandledrejection", handleError);
  }, []);

  useEffect(() => {
    setError(false);
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
        </SessionProvider>
      </ErrorProvider>
    </>
  );
}
