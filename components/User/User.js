import styles from "./User.module.scss";
import Image from "../Image";

export default function User({ name, imageUrl }) {
  return (
    <div className={styles.contianer}>
      <Image className={styles.image} src={imageUrl} alt="" />
      <span className={styles.name}>{name}</span>
    </div>
  );
}
