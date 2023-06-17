import styles from "./PriceRange.module.scss";
import PriceInput from "components/PriceInput";

export default function PriceRange({ onMinChange, onMaxChange, min, max }) {
  // TODO: display a loader while fetching
  return (
    <fieldset>
      <legend>
        <h2>Price</h2>
      </legend>
      <div className={styles["input-container"]}>
        <PriceInput placeholder="From" onChange={onMinChange} value={min} />
        <span>—</span>
        <PriceInput placeholder="To" onChange={onMaxChange} value={max} />
      </div>
    </fieldset>
  );
}
