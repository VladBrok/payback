import styles from "./Product.module.scss";
import Image from "../Image";
import { formatPrice } from "../../lib/formatPrice";

export default function Product({ title, price, image }) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={image}
        alt=""
        layout="fill"
        objectFit="contain"
      />
      <p className={styles.price}>{formatPrice(price)}</p>
      <h3>{title}</h3>
    </div>
  );
}
