import styles from "./ProductList.module.scss";
import Product from "components/Product";
import Category from "components/Category";
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
  const productList = products?.map(p => (
    <div key={p.id}>
      {includeCategory && (
        <Category name={p.category.name} image={p.category.image} />
      )}
      <Link href={`/products/${p.id}`}>
        <a>
          <Product
            imageSize="10rem"
            image={p.image}
            price={p.price}
            isSold={p.isSold}
          >
            <h3>{p.title}</h3>
          </Product>
        </a>
      </Link>
    </div>
  ));

  if (!products?.length) {
    return <>{fallback}</>;
  }

  return <div className={styles.container}>{productList}</div>;
}

export default withDataFetching(
  ProductList,
  ({ filter }) => post("/api/product", { filter }).then(res => res.json()),
  props => ({
    filter: props.filter,
  }),
  true
);
