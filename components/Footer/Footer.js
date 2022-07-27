import styles from "./Footer.module.scss";
import Section from "../Section";
import SocialMediaLink from "../SocialMediaLink/";
import socialMediaLinks from "../../data/socialMediaLinks";

export default function Footer() {
  const links = socialMediaLinks.map(l => (
    <SocialMediaLink key={l.name} {...l} />
  ));

  return (
    <footer className={styles.container}>
      <Section title="We on social media">
        <div className={styles["links-container"]}>{links}</div>
      </Section>
      <Section title="Information"></Section>
      <p className={styles.copyright}>2022 © Payback. All rights reserved.</p>
    </footer>
  );
}
