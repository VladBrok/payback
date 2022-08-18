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
  initialValue = "",
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
    const valueToCheck = isNumeric ? +value : length;
    const valueName = isNumeric ? "value" : "length";

    if (valueToCheck > max) {
      setError(`Max ${valueName} is ${max}`);
    } else if (valueToCheck < min) {
      setError(`Min ${valueName} is ${min}`);
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
        value,
      })}
      {!error && <p className={styles.hint}>{hint}</p>}
      {!error && submitButton}
    </Form>
  );
}
