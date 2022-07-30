import "../styles/globals.scss";
import Menu from "../components/Menu";
import Container from "../components/Container";
import menuItems from "../data/menuItems";
import ProgressBar from "@badrap/bar-of-progress";
import router from "next/router";

menuItems[0].isActive = true;

const progress = new ProgressBar({
  delay: 100,
  color: "rgb(73, 115, 193)",
});
router.events.on("routeChangeStart", progress.start);
router.events.on("routeChangeComplete", progress.finish);
router.events.on("routeChangeError", progress.finish);

export default function MyApp({ Component: Page, pageProps }) {
  return (
    <>
      <Container>
        <Page {...pageProps} />
      </Container>
      <Menu itemsData={menuItems} />
    </>
  );
}
