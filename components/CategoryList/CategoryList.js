import styles from "./CategoryList.module.scss";
import CategoryLink from "components/CategoryLink";
import categoriesData from "data/categories.json";

export default function CategoryList({
  fallback,
  flexDirection = "row",
  filter = null,
  category = props => <CategoryLink {...props} />,
}) {
  const categoryFlexDirection = flexDirection === "row" ? "column" : "row";
  const data = filter ? categoriesData.filter(filter) : categoriesData;
  const categories = data.map(d =>
    category({
      key: d.name,
      flexDirection: categoryFlexDirection,
      imageSizeIncrease: "1.5rem",
      name: d.name,
      imageUrl: d.imageUrl,
    })
  );

  return (
    <div className={styles.container} style={{ flexDirection }}>
      {categories}
      {!categories.length && fallback}
    </div>
  );
}
