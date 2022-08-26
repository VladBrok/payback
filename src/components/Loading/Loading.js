import styles from "./Loading.module.scss";

export default function Loading() {
  // todo: compress ?
  return (
    <img src="/images/loading.svg" alt="Loading" className={styles.image} />
  );
}
