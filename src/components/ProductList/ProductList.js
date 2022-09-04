import styles from "./ProductList.module.scss";
import Product from "components/Product";
import CategoryLink from "components/CategoryLink";
import Empty from "components/Empty";
import { post } from "lib/api/client";
import { FcInTransit } from "react-icons/fc";
import Link from "next/link";
import withDataFetching from "components/withDataFetching";

function ProductList({
  includeCategory = true,
  fallback = (
    <Empty title="Sold out" Icon={FcInTransit} hint="come back later" />
  ),
  fetchedData: products,
}) {
  const productList = products?.map((product, i) => (
    <div key={product.id}>
      {includeCategory && (
        <CategoryLink
          id={product.category.id}
          name={product.category.name}
          image={product.category.image}
        />
      )}
      <Link href={`/products/${product.id}`}>
        <a>
          <Product
            imageSize="10rem"
            price={product.price}
            isSold={product.isSold}
            image={product.image}
          >
            <h3>{product.title}</h3>
          </Product>
        </a>
      </Link>
    </div>
  ));

  if (!products.length) {
    return <>{fallback}</>;
  }

  return <div className={styles.container}>{productList}</div>;
}

export default withDataFetching(
  ProductList,
  ({ filter }, _, pageCursor) =>
    post(`/api/product?pageCursor=${pageCursor}`, { filter }).then(res =>
      res.json()
    ),
  props => ({
    filter: props.filter,
  })
);
