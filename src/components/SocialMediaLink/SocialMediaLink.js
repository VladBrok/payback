import styles from "./SocialMediaLink.module.scss";

export default function SocialMediaLink({ url, name, Icon, color }) {
  return (
    <a className={styles.container} href={url}>
      <Icon className={styles.icon} color={color} />
      <span>{name}</span>
    </a>
  );
}
