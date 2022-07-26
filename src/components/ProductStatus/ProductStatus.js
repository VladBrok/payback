import styles from "./ProductStatus.module.scss";
import utilStyles from "styles/utils.module.scss";
import TestPaymentNotice from "components/TestPaymentNotice";

export default function ProductStatus({
  name,
  description,
  onClick,
  children,
  Icon,
  buyable = false,
  disabled = false,
}) {
  return (
    <div className={styles.container}>
      {Icon && <Icon className={styles.icon} />}
      <h2 className={styles.title}>{name}</h2>
      <p>{description}</p>
      {buyable && <TestPaymentNotice />}
      <button
        type="button"
        className={utilStyles["button-primary"]}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}
