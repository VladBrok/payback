import styles from "./Header.module.scss";
import utilStyles from "styles/utils.module.scss";
import Image from "components/Image";

export default function Header() {
  return (
    <header className={styles.container}>
      <Image
        src="/images/logo.png"
        priority
        className={styles.logo}
        objectFit="contain"
        alt=""
      />
      <h1 className={utilStyles["sr-only"]}>Select categories and products</h1>
    </header>
  );
}
