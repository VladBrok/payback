import styles from "./Loading.module.scss";
import Image from "components/Image";
import useError from "hooks/useError";

export default function Loading() {
  const error = useError();

  if (error) {
    return;
  }

  return (
    <Image
      src="/images/loading.svg"
      alt="Loading"
      className={styles.image}
      loading="eager"
    />
  );
}
