import styles from "./NewMessages.module.scss";

export default function NewMessages({ count }) {
  if (count == 0) {
    return;
  }

  return <div className={styles.container}>{count}</div>;
}
