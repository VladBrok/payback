import Subpage from "../../components/Subpage";
import Category from "../../components/Category";
import ProductList from "../../components/ProductList";
import categories from "../../data/categories.json";
import { byName } from "../../lib/categoryFinders";
import { byCategory } from "../../lib/productFilters";
import { useRouter } from "next/router";

export default function CategoryPage() {
  const router = useRouter();
  const { name } = router.query;

  return (
    <Subpage
      /* fixme: dup */
      title={
        <Category
          flexDirection="row" // todo: make default
          imageSizeIncrease="0px" // todo: make default
          name={name}
          imageUrl={categories.find(byName(name)).imageUrl} // todo: incapsulate
        />
      }
    >
      <ProductList filter={byCategory(name)} includeCategory={false} />
    </Subpage>
  );
}
