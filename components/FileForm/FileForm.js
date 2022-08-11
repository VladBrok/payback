import styles from "./FileForm.module.scss";
import Form from "components/Form";
import Error from "components/Error";
import Image from "components/Image";
import { toBase64 } from "lib/file";
import { BiUpload } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";

const BYTES_IN_MEGABYTE = 1000000;
const MAX_SIZE = BYTES_IN_MEGABYTE * 4;
const ALLOWED_TYPES = new Set(["image/jpg", "image/png", "image/jpeg"]);
const ACCEPT = [...ALLOWED_TYPES.values()].join(", ");

export default function FileForm({ onSubmit, submitButton }) {
  const [file, setFile] = useState();
  const [blob, setBlob] = useState();
  const [error, setError] = useState();
  const inputRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    toBase64(file).then(setBlob);
  }, [file]);

  function handleSubmit() {
    onSubmit(blob);
  }

  function handleClick() {
    inputRef.current.click();
  }

  function handleChange(e) {
    const file = e.target.files[0];

    if (!ALLOWED_TYPES.has(file?.type)) {
      setError("Please select an image");
      setFile();
    } else if (file?.size > MAX_SIZE) {
      setError(`Max file size is ${MAX_SIZE / BYTES_IN_MEGABYTE}MB`);
      setFile();
    } else {
      setFile(file);
      setError();
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {<Error>{error}</Error>}
      <div className={styles.container} onClick={handleClick}>
        {!file && (
          <>
            <input
              className={styles.input}
              type="file"
              accept={ACCEPT}
              onChange={handleChange}
              ref={inputRef}
            />
            <div className={styles.upload} role="button">
              <BiUpload className={styles.icon} />
              Upload
            </div>
          </>
        )}
        {file && blob && (
          <Image className={styles.image} src={blob} objectFit="cover" />
        )}
      </div>
      {file && submitButton}
    </Form>
  );
}
