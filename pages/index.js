import styles from "./index.module.scss";
import Menu from "../components/Menu";
import Main from "../components/Main";
import Footer from "../components/Footer";
import menuItems from "../data/menuItems";
import { useEffect, useRef } from "react";

menuItems[0].isActive = true;

export default function Home() {
  return (
    <>
      <Menu itemsData={menuItems} />
      <Main />
      <Footer />
    </>
  );
}
