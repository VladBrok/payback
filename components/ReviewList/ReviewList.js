import styles from "./ReviewList.module.scss";
import Product from "components/Product";
import User from "components/User";
import reviewData from "data/reviews.json";
import productData from "data/products.json";
import userData from "data/users.json";
import { byId as byProductId } from "lib/productFinders";
import { byId as byUserId } from "lib/userFinders";
import { bySellerId } from "lib/reviewFilters";
import { formatRelativeToNow } from "lib/date";
import Link from "next/link";
import Stars from "components/Stars";

export default function ReviewList({ sellerId }) {
  const reviews = reviewData.filter(bySellerId(sellerId)).map(d => {
    const product = productData.find(byProductId(d.productId));
    const buyer = userData.find(byUserId(d.buyerId));

    return (
      <div className={styles.review} key={product.id}>
        <header className={styles.header}>
          <User
            imageUrl={buyer.picture.large} // fixme: dup (user.picture.large)
            name={buyer.login.username}
          >
            <Stars count={d.rating} />
          </User>
          <span className={styles.date}>{formatRelativeToNow(d.date)}</span>
        </header>

        <p className={styles.text}>{d.text}</p>

        <Link href={`/products/${product.id}`}>
          <a className={styles["product-link"]}>
            <Product
              image={product.image}
              imageSize="3rem"
              price={product.price}
              isSold={product.isSold}
              flexDirection="row"
              flexDirectionWhenExpanded="row"
              alignItems="flex-start"
            >
              <h3>{product.title}</h3>
            </Product>
          </a>
        </Link>
      </div>
    );
  });

  return <div className={styles.container}>{reviews}</div>;
}