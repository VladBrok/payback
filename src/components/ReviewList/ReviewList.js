import styles from "./ReviewList.module.scss";
import Product from "components/Product";
import User from "components/User";
import Stars from "components/Stars";
import withDataFetching from "components/withDataFetching";
import { formatRelativeToNow } from "lib/date";
import { get } from "lib/api/client";
import Link from "next/link";

function ReviewList({ fetchedData: reviews }) {
  const reviewList = reviews.map((review, i) => {
    const product = review.product;
    const buyer = review.buyer;

    return (
      <div className={styles.review} key={review.id}>
        <header className={styles.header}>
          <Link href={`/users/${buyer.id}`}>
            <a>
              <User imageUrl={buyer.image} name={buyer.name} priority>
                <Stars count={review.rating} />
              </User>
            </a>
          </Link>

          <h2>{formatRelativeToNow(review.date)}</h2>
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

export default withDataFetching(
  ReviewList,
  ({ userId }, _, pageCursor) =>
    get(`/api/review?userId=${userId}&pageCursor=${pageCursor}`),
  props => ({ userId: props.userId })
);
