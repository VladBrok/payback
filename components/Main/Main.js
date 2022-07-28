import styles from "./Main.module.scss";
import SearchBar from "../SearchBar";
import Section from "../Section";
import CategoryList from "../CategoryList";
import ProductList from "../ProductList";
import { byPremium } from "../../lib/productFilters";
import { byNameSubstring } from "../../lib/categoryFilters";
import { FcFinePrint, FcRating } from "react-icons/fc";
import { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

export default function Main() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState();

  // Simulate second click on the overlay, because modal stays open after first one
  useEffect(() => {
    function handleClick(e) {
      if (e.target.classList.contains(styles["modal-overlay"])) {
        e.target.click();
      }
    }

    if (modalIsOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => document.removeEventListener("click", handleClick);
  }, [modalIsOpen]);

  useEffect(() => {
    document.body.style.overflow = modalIsOpen ? "hidden" : "unset";
  }, [modalIsOpen]);

  function handleSearchQueryChange(e) {
    setSearchQuery(e.target.value);
  }

  function openModal() {
    setSearchQuery();
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const searchBarLabel = "Find category";

  return (
    <main className={styles.container}>
      <SearchBar label={searchBarLabel} onFocus={openModal} />
      <Modal
        className={styles.modal}
        overlayClassName={styles["modal-overlay"]}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Find category"
        shouldReturnFocusAfterClose={false}
      >
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
      </Modal>

      <Section title="Categories" Icon={FcFinePrint}>
        <CategoryList />
      </Section>

      <Section title="Premium products" Icon={FcRating}>
        <ProductList filter={byPremium} />
      </Section>
    </main>
  );
}
