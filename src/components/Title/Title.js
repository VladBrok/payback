import styles from "./Title.module.scss";

export default function Title({
  text,
  Icon = null,
  justifyContent = "flex-start",
}) {
  return (
    <h2 className={styles.container} style={{ justifyContent }}>
      {Icon && <Icon />} {text}
    </h2>
  );
}
