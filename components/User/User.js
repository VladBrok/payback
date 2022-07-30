import styles from "./User.module.scss";
import Image from "components/Image";
import Rating from "components/Rating";

export default function User({
  name,
  imageUrl,
  rating,
  reviewCount,
  reviewWrapper,
}) {
  return (
    <div className={styles.container}>
      <Image className={styles.image} src={imageUrl} alt="" />
      <div>
        <span className={styles.name}>{name}</span>
        <Rating
          value={rating}
          reviewCount={reviewCount}
          reviewWrapper={reviewWrapper}
        />
      </div>
    </div>
  );
}
