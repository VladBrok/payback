import styles from "./Rating.module.scss";
import ActionButton from "../ActionButton";
import { formatRating } from "../../lib/rating";
import { FaStar } from "react-icons/fa";

const MAX_RATING = 5;
const stars = Array(MAX_RATING).fill(<FaStar />);

export default function Rating({ value, reviewCount }) {
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
      <ActionButton disabled>
        {reviewCount} {`review${pluralModifier}`}
      </ActionButton>
    </div>
  );
}
