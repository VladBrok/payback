import Subpage from "components/Subpage";
import Category from "components/Category";
import ProductList from "components/ProductList";
import PriceRange from "components/PriceRange";
import Loading from "components/Loading";
import { byCategoryAndPrice } from "lib/db/productFilters";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// fixme: use getServerSideProps ?
export default function CategoryPage() {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState();
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    fetch(`/api/category?id=${id}`).then(async res =>
      setCategory(await res.json())
    );
  }, [router.isReady, id]);

  function handleMinPriceChange(e) {
    setMinPrice(extractValue(e));
  }

  function handleMaxPriceChange(e) {
    setMaxPrice(extractValue(e));
  }

  if (!category) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Buy {category.name}</title>
      </Head>

      <Subpage title={<Category name={category.name} image={category.image} />}>
        <PriceRange
          onMinChange={handleMinPriceChange}
          onMaxChange={handleMaxPriceChange}
          min={minPrice}
          max={maxPrice}
        />
        <ProductList
          filter={byCategoryAndPrice(category.name, minPrice, maxPrice)}
          includeCategory={false}
        />
      </Subpage>
    </>
  );
}

function extractValue(e) {
  return e.target.value;
}
