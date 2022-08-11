import styles from "./ProductStatus.module.scss";
import utilStyles from "styles/utils.module.scss";

export default function ProductStatus({
  name,
  description,
  onClick,
  children,
  Icon,
}) {
  return (
    <div className={styles.container}>
      {Icon && <Icon className={styles.icon} />}
      <h2 className={styles.title}>{name}</h2>
      <p>{description}</p>
      <button
        type="button"
        className={utilStyles["button-primary"]}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
