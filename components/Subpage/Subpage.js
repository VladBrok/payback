import styles from "./Subpage.module.scss";
import { ImArrowLeft2 } from "react-icons/im";
import router from "next/router";

export default function Subpage({ title, children, onGoBack = router.back }) {
  const buttonLabel = "go back";

  return (
    <>
      <header className={styles.header}>
        <button onClick={onGoBack} title={buttonLabel} aria-label={buttonLabel}>
          <ImArrowLeft2 className={styles["arrow-icon"]} />
        </button>
        {title}
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
}
