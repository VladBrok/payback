import styles from "./SearchBar.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar({ label, onChange }) {
  return (
    <div className={styles.container}>
      <AiOutlineSearch className={styles.icon} />
      <input
        className={styles.input}
        type="text"
        placeholder={label}
        onChange={onChange}
      />
    </div>
  );
}
