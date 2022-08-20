import Subpage from "components/Subpage";
import Category from "components/Category";
import ProductList from "components/ProductList";
import PriceRange from "components/PriceRange";
import withDataFetching from "components/withDataFetching";
import { get } from "lib/api/client";
import { byCategoryAndPrice } from "lib/db/productFilters";
import Head from "next/head";
import { useState } from "react";

function CategoryPage({ fetchedData: category }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function handleMinPriceChange(e) {
    setMinPrice(extractValue(e));
  }

  function handleMaxPriceChange(e) {
    setMaxPrice(extractValue(e));
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

export default withDataFetching(
  CategoryPage,
  ({ id }) => get(`/api/category?id=${id}`),
  props => ({ id: props.id })
);
