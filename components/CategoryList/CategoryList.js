import styles from "./CategoryList.module.scss";
import CategoryLink from "components/CategoryLink";
import { useState, useEffect } from "react";

export default function CategoryList({
  fallback,
  flexDirection = "row",
  nameSubstr = "",
  category = props => <CategoryLink {...props} />,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`/api/category?nameSubstr=${nameSubstr}`).then(async res =>
      setCategories(await res.json())
    );
  }, [nameSubstr]);

  const categoryFlexDirection = flexDirection === "row" ? "column" : "row";
  const categoryList = categories.map(d =>
    category({
      key: d.id,
      flexDirection: categoryFlexDirection,
      imageSizeIncrease: "1.5rem",
      id: d.id,
      name: d.name,
      image: d.image,
    })
  );

  return (
    <div className={styles.container} style={{ flexDirection }}>
      {categoryList}
      {/* fixme: same problem with fallback as in the ProductList (add isLoaded state) */}
      {!categoryList.length && fallback}{" "}
    </div>
  );
}
