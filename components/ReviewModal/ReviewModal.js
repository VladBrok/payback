import styles from "./ReviewModal.module.scss";
import utilStyles from "styles/utils.module.scss";
import Modal from "components/Modal";
import InputForm from "components/InputForm";
import Stars from "components/Stars";
import { MAX_RATING } from "lib/sharedConstants";
import { useState } from "react";

export default function ReviewModal({ isOpen, close }) {
  const [rating, setRating] = useState(MAX_RATING);

  function handleSubmit(textValue) {
    // todo: post
  }

  const title = "Leave a review";

  return (
    <Modal
      className={styles.modal}
      overlayClassName={styles.overlay}
      isOpen={isOpen}
      close={close}
      label={title}
    >
      <h1 className={styles.title}>{title}</h1>
      <div className={styles["stars-container"]}>
        <Stars count={rating} />
      </div>
      <div className={styles["form-container"]}>
        <InputForm
          max={300}
          onSubmit={handleSubmit}
          submitButton={
            <button className={utilStyles["button-primary"]}>Submit</button>
          }
          input={props => (
            <textarea
              placeholder="Enter review text"
              rows="5"
              cols="15"
              autoFocus
              {...props}
            />
          )}
        />
      </div>
    </Modal>
  );
}