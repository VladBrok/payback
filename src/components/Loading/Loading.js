import styles from "./Loading.module.scss";
import Image from "components/Image";

export default function Loading({ small = false }) {
  return (
    <Image
      src="/images/loading.svg"
      alt="Loading..."
      className={`
      ${small ? styles["image-small"] : styles["image-regular"]}
       ${styles.image}`}
      priority
    />
  );
}
