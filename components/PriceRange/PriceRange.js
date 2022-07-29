import styles from "./PriceRange.module.scss";

export default function PriceRange({ onMinChange, onMaxChange, min, max }) {
  return (
    <fieldset className={styles.container}>
      <legend>Price</legend>
      <div className={styles["input-container"]}>
        <div className={styles["input-wrapper"]}>
          <input
            className={styles.input}
            type="number"
            placeholder="From"
            onChange={onMinChange}
            value={min}
          />
        </div>
        <span>—</span>
        <div className={styles["input-wrapper"]}>
          <input
            className={styles.input}
            type="number"
            placeholder="To"
            onChange={onMaxChange}
            value={max}
          />
        </div>
      </div>
    </fieldset>
  );
}
