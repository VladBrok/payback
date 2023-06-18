import styles from "./CategorySearch.module.scss";
import SearchBar from "components/SearchBar";
import CategoryList from "components/CategoryList";
import { useMemo, useState } from "react";
import { debounce } from "lib/debounce";

export default function CategorySearch({
  children,
  searchBarLabel,
  category,
  categories,
}) {
  const [searchQuery, setSearchQuery] = useState();

  function handleSearchQueryChange(e) {
    const trimmed = e.target.value.trim();
    setSearchQuery(trimmed);
  }

  const debounced = useMemo(() => debounce(handleSearchQueryChange), []);

  return (
    <>
      <div className={styles["search-container"]}>
        <SearchBar label={searchBarLabel} onChange={debounced} autoFocus />
        {children}
      </div>
      <CategoryList
        flexDirection="column"
        searchQuery={searchQuery}
        fallback="Not found"
        category={category}
        data={categories}
        highlightedChars={searchQuery}
      />
    </>
  );
}
