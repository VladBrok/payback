import styles from "./Section.module.scss";

export default function Section({ title, Icon = null, children }) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        {Icon && <Icon className={styles.icon} />} {title}
      </h2>
      {children}
    </section>
  );
}
