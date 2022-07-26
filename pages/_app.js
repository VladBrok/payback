import "../styles/globals.scss";
import Menu from "../components/Menu";
import menuItems from "../data/menuItems";

menuItems[0].isActive = true;

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Menu itemsData={menuItems} />
    </>
  );
}
