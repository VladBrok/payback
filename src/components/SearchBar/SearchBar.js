import styles from "./SearchBar.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar({ label, ...props }) {
  return (
    <div className={styles.container}>
      <AiOutlineSearch className={styles.icon} />
      <input
        className={styles.input}
        type="text"
        placeholder={label}
        {...props}
      />
    </div>
  );
}
