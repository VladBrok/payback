import styles from "./Image.module.scss";
import { default as NextImage } from "next/image";
import { useState } from "react";

export default function Image({ className, ...props }) {
  const [isLoaded, setIsLoaded] = useState(props.priority);

  function handleLoadingComplete() {
    setIsLoaded(true);
  }

  return (
    <div
      className={`${isLoaded ? "" : styles.loading} ${className}`}
      style={{ position: "relative" }}
    >
      <NextImage
        onError={handleLoadingComplete}
        onLoad={handleLoadingComplete}
        onLoadingComplete={handleLoadingComplete}
        layout="fill"
        {...props}
      />
    </div>
  );
}
