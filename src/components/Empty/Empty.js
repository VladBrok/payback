import styles from "./Empty.module.scss";
import Title from "components/Title";

export default function Empty({ title, Icon, hint, children }) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Title text={title} Icon={Icon} justifyContent="center" />
        <p className={styles.hint}>{hint}</p>
      </div>
      {children}
    </div>
  );
}
