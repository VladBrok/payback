import styles from "./Subpage.module.scss";
import { ImArrowLeft2 } from "react-icons/im";
import { useRouter } from "next/router";

export default function Subpage({ title, children }) {
  const router = useRouter();

  function goBack() {
    router.back();
  }

  const buttonLabel = "go back";

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={goBack} title={buttonLabel} aria-label={buttonLabel}>
          <ImArrowLeft2 className={styles["arrow-icon"]} />
        </button>
        {title}
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
