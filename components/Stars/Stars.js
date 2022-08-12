import styles from "./Stars.module.scss";
import { FaStar } from "react-icons/fa";
import { MAX_RATING } from "lib/sharedConstants";

const stars = Array(MAX_RATING)
  .fill(0)
  .map((_, i) => <FaStar key={i} />);

export default function Stars({ count }) {
  return (
    <div className={styles.container}>
      <div className={styles.background}>{stars}</div>
      <div
        className={styles.foreground}
        style={{ clipPath: `inset(0 ${MAX_RATING - count}rem 0 0)` }}
      >
        {stars}
      </div>
    </div>
  );
}
