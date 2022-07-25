import styles from "./Menu.module.scss";
import Link from "next/link";

export default function Menu({ itemsData }) {
  const items = itemsData.map(({ name, Icon, isActive }) => (
    <li key={name} className={isActive ? styles["active-item"] : styles.item}>
      <Link href={name}>
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
