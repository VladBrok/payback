import styles from "./Category.module.scss";
import Image from "components/Image";

export default function Category({
  name,
  image,
  priority = false,
  flexDirection = "row",
  imageSizeIncrease = "0px",
}) {
  return (
    <span
      className={styles.container}
      style={{ flexDirection, "--img-size-increase": imageSizeIncrease }}
    >
      <Image
        className={styles.image}
        src={image}
        alt=""
        objectFit="scale-down"
        priority={priority}
      />
      <span className={styles.name}>{name}</span>
    </span>
  );
}
