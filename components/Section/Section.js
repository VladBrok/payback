import styles from "./Section.module.scss";
import Title from "components/Title";

export default function Section({ title, Icon = null, children }) {
  return (
    <section className={styles.container}>
      <Title text={title} Icon={Icon} />
      <div className={styles["children-container"]}>{children}</div>
    </section>
  );
}
