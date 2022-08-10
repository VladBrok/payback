import styles from "./CategorySearch.module.scss";
import SearchBar from "components/SearchBar";
import CategoryList from "components/CategoryList";
import Container from "components/Container";
import { byNameSubstring } from "lib/categoryFilters";
import { useState } from "react";

export default function CategorySearch({ children, searchBarLabel }) {
  const [searchQuery, setSearchQuery] = useState();

  function handleSearchQueryChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <Container>
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
        filter={searchQuery ? byNameSubstring(searchQuery) : null}
        fallback="Not found"
      />
    </Container>
  );
}
