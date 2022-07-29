import styles from "./ProductList.module.scss";
import productsData from "../../data/products.json";
import Product from "../Product";
import Category from "../Category/";
import Link from "next/link";

export default function ProductList({ filter, includeCategory = true }) {
  const products = productsData.filter(filter).map(d => (
    <div key={d.id}>
      {includeCategory && <Category name={d.category} />}
      <Link href={`/products/${d.id}`}>
        <a>
          <Product image={d.image} price={d.price}>
            <h3>{d.title}</h3>
          </Product>
        </a>
      </Link>
    </div>
  ));

  return <div className={styles.container}>{products}</div>;
}
