import styles from "./PriceRange.module.scss";
import PriceInput from "components/PriceInput";

export default function PriceRange({ onMinChange, onMaxChange }) {
  // TODO: display a loader while fetching
  return (
    <fieldset>
      <legend>
        <h2>Price</h2>
      </legend>
      <div className={styles["input-container"]}>
        <PriceInput placeholder="From" onChange={e => onMinChange(e)} />
        <span>—</span>
        <PriceInput placeholder="To" onChange={onMaxChange} />
      </div>
    </fieldset>
  );
}
