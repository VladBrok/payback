import styles from "./InputForm.module.scss";
import utilStyles from "styles/utils.module.scss";
import Form from "components/Form";
import Error from "components/Error";
import { useState } from "react";

export default function InputForm({
  input,
  submitButton,
  onSubmit,
  max,
  min = 0,
  initialValue = undefined,
  hint = null,
}) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState();

  function handleSubmit() {
    onSubmit(value);
  }

  function handleChange(e) {
    const value = e.target.value;
    const length = value.length;
    const isNumeric = e.target.type === "number";

    // fixme: dup
    if (isNumeric ? +value > max : length > max) {
      setError(`Max ${isNumeric ? "value" : "length"} is ${max}`);
    } else if (isNumeric ? +value < min : length < min) {
      setError(`Min ${isNumeric ? "value" : "length"} is ${min}`);
    } else {
      setError();
    }
    setValue(value);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {<Error>{error}</Error> /* fixme: dup with FileForm */}
      {input({
        className: utilStyles.input,
        onChange: handleChange,
        value: value,
      })}
      {!error && <p className={styles.hint}>{hint}</p>}
      {!error && submitButton}
    </Form>
  );
}
