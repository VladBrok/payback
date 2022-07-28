import styles from "./CategoryList.module.scss";
import categoriesData from "../../data/categories.json";
import Category from "../Category";

export default function CategoryList({
  fallback,
  flexDirection = "row",
  filter = null,
}) {
  const categoryFlexDirection = flexDirection === "row" ? "column" : "row";
  const data = filter ? categoriesData.filter(filter) : categoriesData;
  const categories = data.map(d => (
    <Category
      key={d.name}
      flexDirection={categoryFlexDirection}
      imageSizeIncrease="1.5rem"
      {...d}
    />
  ));

  return (
    <div className={styles.container} style={{ flexDirection }}>
      {categories}
      {!categories.length && fallback}
    </div>
  );
}
