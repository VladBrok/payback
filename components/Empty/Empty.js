import styles from "./Empty.module.scss";
import Title from "../Title";

export default function Empty({ title, Icon, hint }) {
  return (
    <div className={styles.container}>
      <Title text={title} Icon={Icon} />
      <p className={styles.hint}>{hint}</p>
    </div>
  );
}
