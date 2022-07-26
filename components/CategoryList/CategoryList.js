import styles from "./CategoryList.module.scss";
import categoriesData from "../../data/categories.json";
import Link from "next/link";
import Image from "next/image";

export default function CategoryList() {
  const categories = categoriesData.map(d => (
    <li className={styles.category} key={d.imageUrl}>
      <Link href={`/categories/${encodeURIComponent(d.name)}`}>
        <a className={styles.link}>
          <div className={styles["image-wrapper"]}>
            <Image
              src={d.imageUrl}
              alt={d.name}
              objectFit="scale-down"
              layout="fill"
              priority
            />
          </div>
          <span className={styles["category-name"]}>{d.name}</span>
        </a>
      </Link>
    </li>
  ));

  return <ul className={styles.container}>{categories}</ul>;
}
