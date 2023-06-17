import { forwardRef } from "react";
import styles from "./Section.module.scss";
import Title from "components/Title";

export default forwardRef(function Section(
  { title, Icon = null, children },
  titleRef
) {
  return (
    <section className={styles.container}>
      <Title text={title} Icon={Icon} ref={titleRef} />
      <div className={styles["children-container"]}>{children}</div>
    </section>
  );
});
