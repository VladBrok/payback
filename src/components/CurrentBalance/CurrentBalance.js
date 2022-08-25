import styles from "./CurrentBalance.module.scss";
import { formatMoney } from "lib/money";

export default function CurrentBalance({ money }) {
  return (
    <p className={styles.container}>
      Current balance:{" "}
      <span className={styles.money}>{formatMoney(money)}</span>
    </p>
  );
}
