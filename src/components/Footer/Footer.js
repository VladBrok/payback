import styles from "./Footer.module.scss";
import Section from "components/Section";
import SocialMediaLinkList from "components/SocialMediaLinkList";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <hr className={styles.line} />
      <Section title="We on social media">
        <SocialMediaLinkList />
      </Section>
      <p className={styles.copyright}>2023 © Payback. All rights reserved.</p>
    </footer>
  );
}
