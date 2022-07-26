import styles from "./ProductList.module.scss";
import productsData from "../../data/products.json";
import Product from "../Product";

export default function ProductList({ filter }) {
  const products = productsData
    .filter(filter)
    .map(d => (
      <Product key={d.id} image={d.image} price={d.price} title={d.title} />
    ));

  return <ul className={styles.container}>{products}</ul>;
}
