import styles from "./Stars.module.scss";
import { FaStar } from "react-icons/fa";

const MAX = 5;
const stars = Array(MAX)
  .fill(0)
  .map((_, i) => <FaStar key={i} />);

export default function Stars({ count }) {
  return (
    <div className={styles.container}>
      <div className={styles.background}>{stars}</div>
      <div
        className={styles.foreground}
        style={{ clipPath: `inset(0 ${MAX - count}rem 0 0)` }}
      >
        {stars}
      </div>
    </div>
  );
}
