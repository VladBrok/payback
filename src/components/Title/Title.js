import { forwardRef } from "react";
import styles from "./Title.module.scss";

export default forwardRef(function Title(
  { text, Icon = null, justifyContent = "flex-start" },
  ref
) {
  return (
    <h2
      className={styles.container}
      style={{ justifyContent }}
      ref={ref}
      tabIndex={-1}
    >
      {Icon && <Icon />} {text}
    </h2>
  );
});
