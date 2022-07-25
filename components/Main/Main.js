import styles from "./Main.module.scss";
import SearchBar from "../SearchBar";

export default function Main() {
  return (
    <main className={styles.container}>
      <SearchBar
        label="Find category"
        onChange={e => console.log(e.target.value)}
      />
    </main>
  );
}
