import styles from "./CategorySearchModal.module.scss";
import SearchBar from "../SearchBar";
import CategoryList from "../CategoryList";
import Container from "../Container";
import { byNameSubstring } from "../../lib/categoryFilters";
import useScrollBarWidth from "../../hooks/useScrollBarWidth";
import { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

export default function CategorySearchModal({ isOpen, close, searchBarLabel }) {
  const [searchQuery, setSearchQuery] = useState();
  const scrollBarWidth = useScrollBarWidth();

  // Simulate second click on the overlay, because modal stays open after first one
  useEffect(() => {
    function handleClick(e) {
      if (e.target.classList.contains(styles["modal-overlay"])) {
        e.target.click();
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    document.body.style.marginRight = isOpen ? `${scrollBarWidth}px` : "unset";
  }, [isOpen]);

  function handleClose() {
    setSearchQuery();
    close();
  }

  function handleSearchQueryChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <Modal
      className={styles.modal}
      overlayClassName={styles["modal-overlay"]}
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Find category"
      shouldReturnFocusAfterClose={false}
    >
      <Container>
        <SearchBar
          label={searchBarLabel}
          onChange={handleSearchQueryChange}
          autoFocus
        />
        <CategoryList
          flexDirection="column"
          filter={searchQuery ? byNameSubstring(searchQuery) : null}
          fallback="Not found"
        />
      </Container>
    </Modal>
  );
}
