import Category from "components/Category/";
import Link from "next/link";

export default function CategoryLink({ id, ...props }) {
  return (
    <Link href={`/categories/${id}`}>
      <a>
        <Category {...props} />
      </a>
    </Link>
  );
}
