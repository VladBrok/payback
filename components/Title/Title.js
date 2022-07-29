import styles from "./Title.module.scss";

export default function Title({ text, Icon = null }) {
  return (
    <h2 className={styles.container}>
      {Icon && <Icon />} {text}
    </h2>
  );
}
