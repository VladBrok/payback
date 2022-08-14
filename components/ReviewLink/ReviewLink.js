import utilStyles from "styles/utils.module.scss";
import Link from "next/link";

export default function ReviewLink({ userId, children }) {
  return (
    <Link href={`/users/${userId}/reviews`}>
      <a className={utilStyles["button-tertiary"]}>{children}</a>
    </Link>
  );
}
