import styles from "./ProductList.module.scss";
import Product from "components/Product";
import Category from "components/Category";
import Empty from "components/Empty";
import { FcInTransit } from "react-icons/fc";
import Link from "next/link";
import { useState, useEffect } from "react";
import { post } from "lib/api";

export default function ProductList({
  filter,
  includeCategory = true,
  fallback = (
    <Empty title="Sold out" Icon={FcInTransit} hint="come back later" />
  ),
}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    post("product", { filter }).then(async res => {
      setProducts(await res.json());
    });
  }, []);

  const productList = products.map(p => (
    <div key={p.id}>
      {includeCategory && <Category id={p.categoryId} />}
      {/* fixme: dup with ReviewList */}
      <Link href={`/products/${p.id}`}>
        <a>
          <Product
            image={p.image}
            imageSize="10rem"
            price={p.price}
            isSold={p.isSold}
          >
            <h3>{p.title}</h3>
          </Product>
        </a>
      </Link>
    </div>
  ));

  // fixme: fallback should be showed when products are loaded, but product.length is 0
  if (!productList.length) {
    return <>{fallback}</>;
  }

  return <div className={styles.container}>{productList}</div>;
}
