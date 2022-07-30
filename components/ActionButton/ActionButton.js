import styles from "./ActionButton.module.scss";
import Button from "../Button";

export default function ActionButton({ children, ...props }) {
  return (
    <Button className={styles.container} {...props}>
      {children}
    </Button>
  );
}
