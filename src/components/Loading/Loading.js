import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <img src="/images/loading.svg" alt="Loading" className={styles.image} />
  );
}
