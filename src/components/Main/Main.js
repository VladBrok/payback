import styles from "./Main.module.scss";
import SearchBar from "components/SearchBar";
import Section from "components/Section";
import CategoryList from "components/CategoryList";
import ProductList from "components/ProductList";
import PremiumIcon from "components/PremiumIcon";
import dynamic from "next/dynamic";
import { FcFinePrint } from "react-icons/fc";
import { useState } from "react";

const CategorySearchModal = dynamic(
  () => import("components/CategorySearchModal"),
  { ssr: false }
);

export default function Main({ products, categories, productFilter }) {
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
      {modalIsOpen && (
        <CategorySearchModal
          isOpen={modalIsOpen}
          close={closeModal}
          searchBarLabel={searchBarLabel}
        />
      )}

      <Section title="Categories" Icon={FcFinePrint}>
        <CategoryList data={categories} />
      </Section>

      <Section title="Premium products" Icon={PremiumIcon}>
        <ProductList data={products} filter={productFilter} />
      </Section>
    </main>
  );
}
