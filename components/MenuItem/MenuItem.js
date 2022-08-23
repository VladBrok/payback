import styles from "./MenuItem.module.scss";
import Link from "next/link";

export default function MenuItem({
  name,
  href,
  isActive,
  children,
  className,
  ...props
}) {
  return (
    <div
      className={`${
        isActive ? styles["active-item"] : styles.item
      } ${className}`}
      {...props}
    >
      <Link href={href}>
        <a className={styles.link}>
          {children}
          {name}
        </a>
      </Link>
    </div>
  );
}
