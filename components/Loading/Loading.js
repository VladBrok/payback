import styles from "./Loading.module.scss";
import Image from "components/Image";

export default function Loading() {
  return (
    <Image
      src="/images/loading.svg"
      alt="Loading"
      className={styles.image}
      loading="eager"
    />
  );
}
