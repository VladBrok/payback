import styles from "./User.module.scss";
import Image from "../Image";
import { formatRating } from "../../lib/rating";

export default function User({ name, imageUrl, rating, reviewCount }) {
  const pluralModifier = reviewCount === 1 ? "" : "s";

  return (
    <div className={styles.container}>
      <Image className={styles.image} src={imageUrl} alt="" />
      <div>
        <span className={styles.name}>{name}</span>
        <div className={styles["rating-container"]}>
          <span>stars :)</span>
          <span className={styles.rating}>{formatRating(rating)}</span>
          <span>
            {" "}
            {/* fixme: should look like 'cancel' button from Modal, but disabled ? */}
            {reviewCount} {`review${pluralModifier}`}
          </span>
        </div>
      </div>
    </div>
  );
}
