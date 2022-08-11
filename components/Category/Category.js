import styles from "./Category.module.scss";
import Image from "components/Image";
import categories from "data/categories.json";
import { byName } from "lib/categoryFinders";

export default function Category({
  name,
  imageUrl = null,
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
        src={imageUrl ?? categories.find(byName(name)).image}
        alt=""
        objectFit="scale-down"
      />
      <span className={styles.name}>{name}</span>
    </span>
  );
}
