import styles from "./CategoryList.module.scss";
import CategoryLink from "components/CategoryLink";
import { get } from "lib/api/client";
import withDataFetching from "components/withDataFetching";

function CategoryList({
  fallback,
  flexDirection = "row",
  category = props => <CategoryLink {...props} />,
  fetchedData: categories,
}) {
  const categoryFlexDirection = flexDirection === "row" ? "column" : "row";
  const categoryList = categories.map(d =>
    category({
      key: d.id,
      flexDirection: categoryFlexDirection,
      imageSizeIncrease: "1.5rem",
      id: d.id,
      name: d.name,
      image: d.image,
      priority: true,
    })
  );

  return (
    <div className={styles.container} style={{ flexDirection }}>
      {categoryList}
      {!categoryList.length && fallback}{" "}
    </div>
  );
}

export default withDataFetching(
  CategoryList,
  ({ nameSubstr }) => get(`/api/category?nameSubstr=${nameSubstr}`),
  props => ({ nameSubstr: props.nameSubstr ?? "" })
);
