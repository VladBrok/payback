import styles from "./Rating.module.scss";
import Stars from "components/Stars";
import { formatRating } from "lib/rating";

export default function Rating({
  value = 0,
  reviewCount = 0,
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
      <Stars count={value} />
      {reviewWrapper(review)}
    </div>
  );
}
