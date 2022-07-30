import Product from "components/Product";
import Category from "components/Category";
import Empty from "components/Empty";
import Grid from "components/Grid";
import productsData from "data/products.json";
import { FcInTransit } from "react-icons/fc";
import Link from "next/link";

export default function ProductList({
  filter,
  includeCategory = true,
  fallback = (
    <Empty title="Sold out" Icon={FcInTransit} hint="come back later" />
  ),
}) {
  const products = productsData.filter(filter).map(d => (
    <div key={d.id}>
      {includeCategory && <Category name={d.category} />}
      {/* fixme: dup with ReviewList */}
      <Link href={`/products/${d.id}`}>
        <a>
          <Product image={d.image} price={d.price} isSold={d.isSold}>
            <h3>{d.title}</h3>
          </Product>
        </a>
      </Link>
    </div>
  ));

  if (!products.length) {
    return <>{fallback}</>;
  }

  return <Grid>{products}</Grid>;
}
