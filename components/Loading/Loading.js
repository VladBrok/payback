import styles from "./Loading.module.scss";
import useError from "hooks/useError";

export default function Loading() {
  const error = useError();

  if (error) {
    return;
  }

  return (
    <img src="/images/loading.svg" alt="Loading" className={styles.image} />
  );
}
