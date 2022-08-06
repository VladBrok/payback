import styles from "./NewMessages.module.scss";

export default function NewMessages({ count }) {
  return <div className={styles.container}>{count}</div>;
}
