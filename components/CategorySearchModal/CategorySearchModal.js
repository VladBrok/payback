import styles from "./CategorySearchModal.module.scss";
import utilStyles from "styles/utils.module.scss";
import CategorySearch from "components/CategorySearch";
import useScrollBarWidth from "hooks/useScrollBarWidth";
import { useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

export default function CategorySearchModal({ isOpen, close, searchBarLabel }) {
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
    const bodyStyle = document.body.style;
    bodyStyle.overflow = isOpen ? "hidden" : "unset";
    bodyStyle.marginRight = isOpen ? `${scrollBarWidth}px` : "unset";

    return () => {
      bodyStyle.overflow = "unset";
      bodyStyle.marginRight = "unset";
    };
  }, [isOpen, scrollBarWidth]);

  function handleClose() {
    close();
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
      <CategorySearch searchBarLabel={searchBarLabel}>
        <button
          type="button"
          className={utilStyles["button-tertiary"]}
          style={{ overflowWrap: "normal" }}
          onClick={handleClose}
        >
          Cancel
        </button>
      </CategorySearch>
    </Modal>
  );
}
