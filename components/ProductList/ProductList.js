import styles from "./ProductList.module.scss";
import productsData from "../../data/products.json";
import categoriesData from "../../data/categories.json";
import Product from "../Product";
import Category from "../Category/";
import { byName } from "../../lib/categoryFinders";

export default function ProductList({ filter }) {
  const products = productsData.filter(filter).map(d => (
    <div key={d.id}>
      <Category
        flexDirection="row"
        imageSizeIncrease="0px"
        name={d.category}
        imageUrl={categoriesData.find(byName(d.category)).imageUrl}
      />
      <Product image={d.image} price={d.price} title={d.title} />
    </div>
  ));

  return <ul className={styles.container}>{products}</ul>;
}
