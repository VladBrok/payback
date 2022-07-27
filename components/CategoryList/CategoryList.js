import styles from "./CategoryList.module.scss";
import categoriesData from "../../data/categories.json";

import Category from "../Category";

// todo: make generic list ?
export default function CategoryList() {
  const categories = categoriesData.map(d => (
    <Category flexDirection="column" imageSizeIncrease="1.5rem" {...d} />
  ));

  return <div className={styles.container}>{categories}</div>;
}
