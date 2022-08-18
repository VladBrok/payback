import Subpage from "components/Subpage";
import Category from "components/Category";
import ProductList from "components/ProductList";
import PriceRange from "components/PriceRange";
import Loading from "components/Loading";
import { byCategoryAndPrice } from "lib/db/productFilters";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function CategoryPage({ id }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState();

  useEffect(() => {
    fetch(`/api/category?id=${id}`).then(async res =>
      setCategory(await res.json())
    );
  }, [id]);

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
