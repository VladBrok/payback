import { useMemo } from "react";
import styles from "./Category.module.scss";
import Image from "components/Image";

export default function Category({
  name,
  image,
  priority = false,
  flexDirection = "row",
  imageSizeIncrease = "0px",
  highlightedChars = "",
}) {
  const nameWithHighlightedChars = useMemo(() => {
    let leftToHighlight = highlightedChars;

    const nameChars = name.props?.children
      ? [...name.props.children]
      : [...name];

    return nameChars.map((char, i) => {
      const indexOf = leftToHighlight.indexOf(char);
      if (indexOf >= 0) {
        leftToHighlight =
          leftToHighlight.slice(0, indexOf) +
          leftToHighlight.slice(indexOf + 1);
        return (
          <span key={i} className={`${styles.highlighted} ${styles.letter}`}>
            {char}
          </span>
        );
      }
      return (
        <span key={i} className={styles.letter}>
          {char}
        </span>
      );
    });
  }, [highlightedChars, name]);

  return (
    <span
      className={styles.container}
      style={{ flexDirection, "--img-size-increase": imageSizeIncrease }}
    >
      <Image
        className={styles.image}
        src={image}
        alt=""
        objectFit="scale-down"
        priority={priority}
      />
      <span className={styles.name}>{nameWithHighlightedChars}</span>
    </span>
  );
}
