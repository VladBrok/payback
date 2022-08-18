import styles from "./TestModeNotice.module.scss";

export default function TestModeNotice({ children }) {
  return <p className={styles.container}>{children}</p>;
}
