import Category from "components/Category/";
import Link from "next/link";

export default function CategoryLink({ name, ...props }) {
  return (
    <Link href={`/categories/${encodeURIComponent(name)}`}>
      <a>
        <Category name={name} {...props} />
      </a>
    </Link>
  );
}
