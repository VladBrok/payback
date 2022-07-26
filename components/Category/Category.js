import styles from "./Category.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Category({
  imageUrl,
  name,
  flexDirection,
  imageSizeIncrease,
}) {
  return (
    <li
      className={styles.container}
      key={imageUrl}
      style={{ "--img-size-increase": imageSizeIncrease }}
    >
      <Link href={`/categories/${encodeURIComponent(name)}`}>
        <a className={styles.link} style={{ flexDirection }}>
          <div className={styles["image-wrapper"]}>
            <Image
              src={imageUrl}
              alt={name}
              objectFit="scale-down"
              layout="fill"
              priority
            />
          </div>
          <span className={styles.name}>{name}</span>
        </a>
      </Link>
    </li>
  );
}
