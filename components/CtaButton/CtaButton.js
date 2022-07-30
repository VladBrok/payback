import styles from "./CtaButton.module.scss";

export default function CtaButton({ onClick, children }) {
  return (
    <button type="button" className={styles.container} onClick={onClick}>
      {children}
    </button>
  );
}
