import styles from "./PriceInput.module.scss";

export default function PriceInput({ placeholder, onChange }) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="number"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
