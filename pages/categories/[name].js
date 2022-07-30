import Subpage from "components/Subpage";
import Category from "components/Category";
import ProductList from "components/ProductList";
import PriceRange from "components/PriceRange";
import Router from "components/Router";
import { byCategoryAndPrice } from "lib/productFilters";
import { useState } from "react";
import Head from "next/head";

export default function CategoryPage() {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function handleMinPriceChange(e) {
    setMinPrice(extractValue(e));
  }

  function handleMaxPriceChange(e) {
    setMaxPrice(extractValue(e));
  }

  return (
    <Router>
      {({ name: categoryName }) => (
        <>
          <Head>
            <title>Buy {categoryName}</title>
          </Head>
          <Subpage title={<Category name={categoryName} />}>
            <PriceRange
              onMinChange={handleMinPriceChange}
              onMaxChange={handleMaxPriceChange}
              min={minPrice}
              max={maxPrice}
            />
            <ProductList
              filter={byCategoryAndPrice(categoryName, minPrice, maxPrice)}
              includeCategory={false}
            />
          </Subpage>
        </>
      )}
    </Router>
  );
}

function extractValue(e) {
  return e.target.value;
}
