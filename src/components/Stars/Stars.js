import styles from "./Stars.module.scss";
import { FaStar } from "react-icons/fa";
import { MAX_RATING } from "lib/sharedConstants";

export default function Stars({
  count,
  starWrapper = s => s,
  onStarClick = undefined,
}) {
  if (count > MAX_RATING) {
    throw new Error(`Max allowed value is ${MAX_RATING}. Got ${count}`);
  }

  const stars = Array(MAX_RATING)
    .fill(0)
    .map((_, i) => (
      <span key={i}>
        {starWrapper(<FaStar onClick={() => onStarClick?.(i)} />)}
      </span>
    ));

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
