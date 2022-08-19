import styles from "./ProductList.module.scss";
import Product from "components/Product";
import Category from "components/Category";
import Empty from "components/Empty";
import Loading from "components/Loading";
import { post } from "lib/api/client";
import { FcInTransit } from "react-icons/fc";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProductList({
  filter,
  includeCategory = true,
  fallback = (
    <Empty title="Sold out" Icon={FcInTransit} hint="come back later" />
  ),
}) {
  const [products, setProducts] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    post("/api/product", { filter }).then(async res => {
      const prods = await res.json();
      setProducts(prods);
      setIsLoaded(true);
    });
  }, [filter]);

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

  if (!isLoaded) {
    return <Loading />;
  }

  if (!productList?.length) {
    return <>{fallback}</>;
  }

  return <div className={styles.container}>{productList}</div>;
}
