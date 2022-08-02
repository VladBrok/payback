import styles from "./Menu.module.scss";
import itemsData from "data/menuItems";
import { getRoot } from "lib/path";
import Link from "next/link";

export default function Menu({ activePath }) {
  activePath = getRoot(activePath);

  const items = itemsData.map(({ name, path, Icon }) => (
    <li
      key={name}
      className={path === activePath ? styles["active-item"] : styles.item}
    >
      <Link href={path}>
        <a className={styles.link}>
          <span className={styles.icon}>
            <Icon />
          </span>
          <span>{name}</span>
        </a>
      </Link>
    </li>
  ));

  return (
    <nav>
      <ul className={styles.container}>{items}</ul>
    </nav>
  );
}
