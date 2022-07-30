import styles from "./CtaButton.module.scss";
import Button from "components/Button";

export default function CtaButton({ children, ...props }) {
  return (
    <Button className={styles.container} {...props}>
      {children}
    </Button>
  );
}
