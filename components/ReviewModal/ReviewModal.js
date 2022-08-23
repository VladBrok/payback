import styles from "./ReviewModal.module.scss";
import utilStyles from "styles/utils.module.scss";
import Modal from "components/Modal";
import InputForm from "components/InputForm";
import Stars from "components/Stars";
import { MAX_RATING } from "lib/sharedConstants";
import { post } from "lib/api/client";
import { PaybackError } from "lib/errors";
import { useState } from "react";

export default function ReviewModal({ isOpen, close, productId, buyerId }) {
  const [rating, setRating] = useState(MAX_RATING);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(text) {
    setIsSubmitting(true);
    post("/api/review", { rating, text, productId, buyerId })
      .then(close)
      .catch(err => {
        throw new PaybackError("Cannot create a review", err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
            <button
              className={utilStyles["button-primary"]}
              disabled={isSubmitting}
            >
              Submit
            </button>
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
