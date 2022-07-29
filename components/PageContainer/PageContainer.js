import styles from "./PageContainer.module.scss";

export default function PageContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}
