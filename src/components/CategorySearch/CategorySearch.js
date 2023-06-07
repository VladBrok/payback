import styles from "./CategorySearch.module.scss";
import SearchBar from "components/SearchBar";
import CategoryList from "components/CategoryList";
import { useState } from "react";

export default function CategorySearch({
  children,
  searchBarLabel,
  category,
  categories,
}) {
  const [searchQuery, setSearchQuery] = useState();

  function handleSearchQueryChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <div className={styles["search-container"]}>
        <SearchBar
          label={searchBarLabel}
          onChange={handleSearchQueryChange}
          autoFocus
        />
        {children}
      </div>
      <CategoryList
        flexDirection="column"
        searchQuery={searchQuery}
        fallback="Not found"
        category={category}
        data={categories}
      />
    </>
  );
}
