import styles from "./SocialMediaLinkList.module.scss";
import SocialMediaLink from "../SocialMediaLink/";
import socialMediaLinks from "../../data/socialMediaLinks";

// todo: make generic list ?
export default function SocialMediaLinkList() {
  const links = socialMediaLinks.map(l => (
    <SocialMediaLink key={l.name} {...l} />
  ));

  return <div className={styles.container}>{links}</div>;
}
