import styles from "./Footer.module.scss";
import Section from "../Section";
import SocialMediaLinkList from "../SocialMediaLinkList";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <hr className={styles.line} />
      <Section title="We on social media">
        <SocialMediaLinkList />
      </Section>
      <Section title="Information"></Section>
      <p className={styles.copyright}>2022 © Payback. All rights reserved.</p>
    </footer>
  );
}
