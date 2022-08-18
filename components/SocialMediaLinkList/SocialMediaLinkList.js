import styles from "./SocialMediaLinkList.module.scss";
import SocialMediaLink from "components/SocialMediaLink";
import socialMediaLinks from "data/socialMediaLinks";

export default function SocialMediaLinkList() {
  const links = socialMediaLinks.map(l => (
    <SocialMediaLink key={l.name} {...l} />
  ));

  return <div className={styles.container}>{links}</div>;
}
