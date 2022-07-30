import styles from "./Rating.module.scss";
import { formatRating } from "lib/rating";
import { FaStar } from "react-icons/fa";

const MAX_RATING = 5;
const stars = Array(MAX_RATING)
  .fill(0)
  .map((_, i) => <FaStar key={i} />);

export default function Rating({
  value,
  reviewCount,
  reviewWrapper = children => children,
  valueFontSize = "1rem",
}) {
  const pluralModifier = reviewCount === 1 ? "" : "s";
  const review = `${reviewCount} review${pluralModifier}`;

  return (
    <div className={styles.container}>
      <span className={styles.rating} style={{ fontSize: valueFontSize }}>
        {formatRating(value)}
      </span>
      <div className={styles["star-container"]}>
        <div className={styles["star-background"]}>{stars}</div>
        <div
          className={styles["star-foreground"]}
          style={{ clipPath: `inset(0 ${MAX_RATING - value}rem 0 0)` }}
        >
          {stars}
        </div>
      </div>
      {reviewWrapper(review)}
    </div>
  );
}
