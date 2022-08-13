import styles from "./CategorySearchModal.module.scss";
import utilStyles from "styles/utils.module.scss";
import CategorySearch from "components/CategorySearch";
import Modal from "components/Modal";

export default function CategorySearchModal({ isOpen, close, searchBarLabel }) {
  return (
    <Modal
      className={styles.modal}
      overlayClassName={styles["modal-overlay"]}
      isOpen={isOpen}
      close={close}
      label="Find category"
    >
      <CategorySearch searchBarLabel={searchBarLabel}>
        <button
          type="button"
          className={utilStyles["button-tertiary"]}
          style={{ overflowWrap: "normal" }}
          onClick={close}
        >
          Cancel
        </button>
      </CategorySearch>
    </Modal>
  );
}
