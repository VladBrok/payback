import styles from "./Product.module.scss";
import Image from "components/Image";
import { formatPrice } from "lib/price";

export default function Product({
  price,
  image,
  children,
  isSold,
  flexDirectionWhenExpanded = "column",
}) {
  return (
    <>
      {isSold && <div className={styles.sold}>Sold</div>}
      <div
        className={styles.container}
        style={{ "--flex-direction-expand": flexDirectionWhenExpanded }}
      >
        <Image
          className={styles.image}
          src={image}
          alt=""
          objectFit="contain"
        />
        <div className={styles.info}>
          <p className={styles.price}>{formatPrice(price)}</p>
          {children}
        </div>
      </div>
    </>
  );
}
