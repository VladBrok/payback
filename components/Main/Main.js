import styles from "./Main.module.scss";
import SearchBar from "components/SearchBar";
import Section from "components/Section";
import CategoryList from "components/CategoryList";
import ProductList from "components/ProductList";
import CategorySearchModal from "components/CategorySearchModal";
import { byPremium } from "lib/productFilters";
import { FcFinePrint, FcRating } from "react-icons/fc";
import { useState } from "react";

export default function Main() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const searchBarLabel = "Find category";

  return (
    <main className={styles.container}>
      <SearchBar label={searchBarLabel} onFocus={openModal} />
      <CategorySearchModal
        isOpen={modalIsOpen}
        close={closeModal}
        searchBarLabel={searchBarLabel}
      />

      <Section title="Categories" Icon={FcFinePrint}>
        <CategoryList />
      </Section>

      <Section title="Premium products" Icon={FcRating}>
        <ProductList filter={byPremium} />
      </Section>
    </main>
  );
}
