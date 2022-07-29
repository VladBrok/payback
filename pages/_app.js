import "../styles/globals.scss";
import Menu from "../components/Menu";
import PageContainer from "../components/PageContainer";
import menuItems from "../data/menuItems";

menuItems[0].isActive = true;

export default function MyApp({ Component: Page, pageProps }) {
  return (
    <>
      <PageContainer>
        <Page {...pageProps} />
      </PageContainer>
      <Menu itemsData={menuItems} />
    </>
  );
}
