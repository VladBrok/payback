import styles from "./Menu.module.scss";
import itemsData from "data/menuItems";
import MenuItem from "components/MenuItem";
import { getRoot } from "lib/path";

export default function Menu({ activePath }) {
  activePath = getRoot(activePath);

  const items = itemsData.map(({ name, path, Icon }, i) => (
    <MenuItem
      key={name}
      isActive={getRoot(path) === activePath}
      name={<span>{name}</span>}
      href={path}
      tabIndex={i + 1}
    >
      <span className={styles.icon}>
        <Icon />
      </span>
    </MenuItem>
  ));

  return (
    <nav>
      <div className={styles.container}>{items}</div>
    </nav>
  );
}
