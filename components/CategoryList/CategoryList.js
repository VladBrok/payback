import styles from "./CategoryList.module.scss";
import CategoryLink from "components/CategoryLink";
import Loading from "components/Loading";
import { get } from "lib/api/client";
import { useState, useEffect } from "react";

export default function CategoryList({
  fallback,
  flexDirection = "row",
  nameSubstr = "",
  category = props => <CategoryLink {...props} />,
}) {
  const [categories, setCategories] = useState();

  useEffect(() => {
    get(`/api/category?nameSubstr=${nameSubstr}`).then(setCategories);
  }, [nameSubstr]);

  if (!categories) {
    return <Loading/>
  }

  const categoryFlexDirection = flexDirection === "row" ? "column" : "row";
  const categoryList = categories?.map(d =>
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
      {!categoryList?.length && fallback}{" "}
    </div>
  );
}
