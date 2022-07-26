import styles from "./Product.module.scss";
import Image from "next/image";
import { formatPrice } from "../../lib/formatPrice";

export default function Product({ title, price, image }) {
  return (
    <li className={styles.container}>
      {/* fixme: dup with category ? */}
      <div className={styles["image-wrapper"]}>
        <Image src={image} alt="" layout="fill" objectFit="contain" />
      </div>
      <p className={styles.price}>{formatPrice(price)}</p>
      <h3>{title}</h3>
    </li>
  );
}
