import styles from "./TestPaymentNotice.module.scss";

export default function TestPaymentNotice() {
  return (
    <p className={styles.container}>
      After clicking &quot;Buy&quot;, click &quot;Skip Saved Cards&quot; -&gt;
      uncheck option &quot;Save card securely for future payments&quot; -&gt;
      click &quot;Pay&quot; -&gt; click &quot;Success&quot;
    </p>
  );
}
