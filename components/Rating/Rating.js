import styles from "./Rating.module.scss";
import { formatRating } from "../../lib/rating";
import { FaStar } from "react-icons/fa";

const MAX_RATING = 5;
const stars = Array(MAX_RATING)
  .fill(0)
  .map((_, i) => <FaStar key={i} />);

export default function Rating({ value, reviewCount, reviewWrapper }) {
  const pluralModifier = reviewCount === 1 ? "" : "s";

  return (
    <div className={styles.container}>
      <div className={styles["star-background"]}>{stars}</div>
      <div
        className={styles["star-foreground"]}
        style={{ clipPath: `inset(0 ${MAX_RATING - value}rem 0 0)` }}
      >
        {stars}
      </div>
      <span className={styles.rating}>{formatRating(value)}</span>
      {reviewWrapper(`${reviewCount} review${pluralModifier}`)}
    </div>
  );
}
