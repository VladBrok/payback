import styles from "./Error.module.scss";

export default function Error({ children }) {
  return <p className={styles.error}>{children}&nbsp;</p>;
}
