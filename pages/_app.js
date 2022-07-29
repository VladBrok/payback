import "../styles/globals.scss";
import Menu from "../components/Menu";
import Container from "../components/Container";
import menuItems from "../data/menuItems";

menuItems[0].isActive = true;

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
