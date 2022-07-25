import styles from "./index.module.scss";
import Menu from "../components/Menu";
import menuItems from "../data/menuItems";

menuItems[0].isActive = true;

export default function Home() {
  return <Menu itemsData={menuItems} />;
}
