import styles from "./index.module.scss";
import Menu from "../components/Menu";
import SearchBar from "../components/SearchBar";
import menuItems from "../data/menuItems";

menuItems[0].isActive = true;

export default function Home() {
  return (
    <>
      <main style={{ padding: "0 1rem" }}>
        <SearchBar
          label="Find category"
          onChange={e => console.log(e.target.value)}
        />
      </main>
      <Menu itemsData={menuItems} />
    </>
  );
}
