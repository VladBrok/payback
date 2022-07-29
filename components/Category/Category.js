import styles from "./Category.module.scss";
import Image from "../Image";
import categories from "../../data/categories.json";
import { byName } from "../../lib/categoryFinders";
import Link from "next/link";

export default function Category({
  name,
  imageUrl = null,
  flexDirection = "row",
  imageSizeIncrease = "0px",
}) {
  return (
    <div
      className={styles.container}
      key={imageUrl}
      style={{ "--img-size-increase": imageSizeIncrease }}
    >
      <Link href={`/categories/${encodeURIComponent(name)}`}>
        <a className={styles.link} style={{ flexDirection }}>
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
    </div>
  );
}
