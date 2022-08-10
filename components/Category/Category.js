import styles from "./Category.module.scss";
import Image from "components/Image";
import categories from "data/categories.json";
import { byName } from "lib/categoryFinders";
import Link from "next/link";

export default function Category({
  name,
  imageUrl = null,
  flexDirection = "row",
  imageSizeIncrease = "0px",
}) {
  return (
    <Link href={`/categories/${encodeURIComponent(name)}`}>
      <a
        className={styles.container}
        style={{ flexDirection, "--img-size-increase": imageSizeIncrease }}
      >
        <Image
          className={styles.image}
          // fixme: wrap in useMemo or useCallback ?
          src={imageUrl ?? categories.find(byName(name)).imageUrl}
          alt=""
          objectFit="scale-down"
        />
        <span className={styles.name}>{name}</span>
      </a>
    </Link>
  );
}
