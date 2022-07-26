import styles from "./CategoryList.module.scss";
import categoriesData from "../../data/categories.json";

import Category from "../Category";

export default function CategoryList() {
  const categories = categoriesData.map(d => (
    <Category flexDirection="column" imageSizeIncrease="1.5rem" {...d} />
  ));
  // todo: make generic list ?
  return <ul className={styles.container}>{categories}</ul>;
}
