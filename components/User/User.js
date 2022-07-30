import styles from "./User.module.scss";
import Image from "../Image";
import Rating from "../Rating";

export default function User({ name, imageUrl, rating, reviewCount }) {
  return (
    <div className={styles.container}>
      <Image className={styles.image} src={imageUrl} alt="" />
      <div>
        <span className={styles.name}>{name}</span>
        <Rating value={rating} reviewCount={reviewCount} />
      </div>
    </div>
  );
}
