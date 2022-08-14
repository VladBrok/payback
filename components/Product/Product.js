import styles from "./Product.module.scss";
import Image from "components/Image";
import { formatMoney } from "lib/money";

export default function Product({
  price,
  image,
  children,
  imageSize,
  flexDirection = "column",
  flexDirectionWhenExpanded = "column",
  alignItems = "stretch",
}) {
  return (
    <>
      <div
        className={styles.container}
        style={{
          "--flex-direction": flexDirection,
          "--flex-direction-expand": flexDirectionWhenExpanded,
          "--img-size": imageSize,
          "--align-items": alignItems,
        }}
      >
        <Image
          className={styles.image}
          src={image}
          alt=""
          objectFit="contain"
        />
        <div className={styles.info}>
          <p className={styles.price}>{formatMoney(price)}</p>
          {children}
        </div>
      </div>
    </>
  );
}
