import styles from "./Main.module.scss";
import SearchBar from "../SearchBar";
import Section from "../Section";
import { FcFinePrint, FcRating } from "react-icons/fc";

export default function Main() {
  return (
    <main className={styles.container}>
      <SearchBar
        label="Find category"
        onChange={e => console.log(e.target.value)}
      />
      <Section title="categories" Icon={FcFinePrint}></Section>
      <Section title="premium products" Icon={FcRating}></Section>
    </main>
  );
}
