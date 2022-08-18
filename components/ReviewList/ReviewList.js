import styles from "./ReviewList.module.scss";
import Product from "components/Product";
import User from "components/User";
import Stars from "components/Stars";
import { formatRelativeToNow } from "lib/date";
import Link from "next/link";

export default function ReviewList({ reviews }) {
  const reviewList = reviews.map(review => {
    const product = review.product;
    const buyer = review.buyer;

    return (
      <div className={styles.review} key={review.id}>
        <header className={styles.header}>
          <Link href={`/users/${buyer.id}`}>
            <a>
              <User imageUrl={buyer.image} name={buyer.name}>
                <Stars count={review.rating} />
              </User>
            </a>
          </Link>
          <span className={styles.date}>
            {formatRelativeToNow(review.date)}
          </span>
        </header>

        <p className={styles.text}>{review.text}</p>

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

  return <div className={styles.container}>{reviewList}</div>;
}
