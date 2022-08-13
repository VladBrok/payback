import styles from "./ReviewModal.module.scss";
import utilStyles from "styles/utils.module.scss";
import Modal from "components/Modal";
import InputForm from "components/InputForm";
import Stars from "components/Stars";
import { MAX_RATING } from "lib/sharedConstants";
import { useState } from "react";
import { post } from "lib/api";

export default function ReviewModal({ isOpen, close, productId, buyerId }) {
  const [rating, setRating] = useState(MAX_RATING);

  function handleSubmit(text) {
    post("review", { rating, text, productId, buyerId }).then(close);
  }

  function handleStarClick(index) {
    setRating(index + 1);
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
        <Stars
          count={rating}
          onStarClick={handleStarClick}
          starWrapper={s => <button aria-label="Select rating">{s}</button>}
        />
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
