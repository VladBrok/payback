import styles from "./Main.module.scss";
import SearchBar from "components/SearchBar";
import Section from "components/Section";
import CategoryList from "components/CategoryList";
import ProductList from "components/ProductList";
import PremiumIcon from "components/PremiumIcon";
import dynamic from "next/dynamic";
import { FcFinePrint } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";

const CategorySearchModal = dynamic(
  () => import("components/CategorySearchModal"),
  { ssr: false }
);

export default function Main({ products, categories, productFilter }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalWasOpen, setModalWasOpen] = useState(false);
  const categoriesRef = useRef(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!modalWasOpen && modalIsOpen) {
      setModalWasOpen(true);
      return;
    }

    if (modalIsOpen || !modalWasOpen) {
      return;
    }

    categoriesRef.current?.focus();
  }, [modalIsOpen, modalWasOpen]);

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

      <Section title="Categories" Icon={FcFinePrint} ref={categoriesRef}>
        <CategoryList data={categories} />
      </Section>

      <Section title="Premium products" Icon={PremiumIcon}>
        <ProductList data={products} filter={productFilter} />
      </Section>
    </main>
  );
}
