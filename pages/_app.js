import "styles/globals.scss";
import Menu from "components/Menu";
import Container from "components/Container";
import Auth from "components/Auth";
import ProgressBar from "@badrap/bar-of-progress";
import router, { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

const progress = new ProgressBar({
  delay: 100,
  color: "#3e68b6", // fixme: dup with colors.scss
});
router.events.on("routeChangeStart", progress.start);
router.events.on("routeChangeComplete", progress.finish);
router.events.on("routeChangeError", progress.finish);

export default function MyApp({ Component: Page, pageProps }) {
  const pathname = useRouter().pathname;

  return (
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
  );
}
