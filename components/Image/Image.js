import styles from "./Image.module.scss";
import { default as NextImage } from "next/image";

export default function Image({ className, ...props }) {
  return (
    <div className={className} style={{ position: "relative" }}>
      <NextImage {...props} />
    </div>
  );
}
