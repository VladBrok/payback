import styles from "./Button.module.scss";

export default function Button({ onClick, children }) {
  return (
    <button type="button" className={styles.container} onClick={onClick}>
      {children}
    </button>
  );
}
