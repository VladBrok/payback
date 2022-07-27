import styles from "./Category.module.scss";
import Link from "next/link";
import Image from "../Image";

export default function Category({
  imageUrl,
  name,
  flexDirection,
  imageSizeIncrease,
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
            src={imageUrl}
            alt={name}
            objectFit="scale-down"
            layout="fill"
            priority
          />
          <span className={styles.name}>{name}</span>
        </a>
      </Link>
    </div>
  );
}
