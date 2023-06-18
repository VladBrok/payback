import Loading from "components/Loading/Loading";
import styles from "./PriceRange.module.scss";
import PriceInput from "components/PriceInput";

export default function PriceRange({ onMinChange, onMaxChange, isLoading }) {
  return (
    <fieldset>
      <legend className={styles.header}>
        <h2>Price</h2>
        {isLoading && <Loading small />}
      </legend>
      <div className={styles["input-container"]}>
        <PriceInput placeholder="From" onChange={e => onMinChange(e)} />
        <span>—</span>
        <PriceInput placeholder="To" onChange={onMaxChange} />
      </div>
    </fieldset>
  );
}
