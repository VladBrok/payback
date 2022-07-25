import styles from "./Footer.module.scss";
import Section from "../Section";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <Section title="We on social media"></Section>
      <Section title="Information"></Section>
      <p className={styles.copyright}>2022 © Payback. All rights reserved.</p>
    </footer>
  );
}
