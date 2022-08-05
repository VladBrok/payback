import styles from "./Menu.module.scss";
import itemsData from "data/menuItems";
import MenuItem from "components/MenuItem";
import { getRoot } from "lib/path";
import { useEffect, useRef } from "react";

export default function Menu({ activePath }) {
  const containerRef = useRef();

  useEffect(() => {
    const menu = containerRef.current;
    document.body.style.setProperty(
      "--menu-size",
      `${Math.min(menu.offsetWidth, menu.offsetHeight)}px`
    );
  }, []);

  activePath = getRoot(activePath);

  const items = itemsData.map(({ name, path, Icon }) => (
    <MenuItem
      key={name}
      isActive={getRoot(path) === activePath}
      name={name}
      href={path}
    >
      <span className={styles.icon}>
        <Icon />
      </span>
    </MenuItem>
  ));

  return (
    <nav>
      <div className={styles.container} ref={containerRef}>
        {items}
      </div>
    </nav>
  );
}
