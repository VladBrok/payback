import styles from "./User.module.scss";
import Image from "components/Image";

export default function User({ name, imageUrl, priority = false, children }) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={imageUrl}
        alt=""
        priority={priority}
      />
      <div>
        <span className={styles.name}>{name}</span>
        {children}
      </div>
    </div>
  );
}
