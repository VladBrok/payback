import Subpage from "components/Subpage";
import Category from "components/Category";
import ProductList from "components/ProductList";
import PriceRange from "components/PriceRange";
import withDataFetching from "components/withDataFetching";
import { get } from "lib/api/client";
import { byCategoryAndPrice } from "lib/db/productFilters";
import Head from "next/head";
import { useState, useEffect } from "react";

function CategoryPage({ fetchedData: category }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  function handleMinPriceChange(e) {
    handlePriceChange(setMinPrice, e);
  }

  function handleMaxPriceChange(e) {
    handlePriceChange(setMaxPrice, e);
  }

  function handlePriceChange(setter, e) {
    setter(e.target.value);
    setReset(true);
  }

  return (
    <>
      <Head>
        <title>Buy {category.name}</title>
      </Head>

      <Subpage
        title={
          <Category name={<h1>{category.name}</h1>} image={category.image} />
        }
      >
        <PriceRange
          onMinChange={handleMinPriceChange}
          onMaxChange={handleMaxPriceChange}
          min={minPrice}
          max={maxPrice}
        />
        <ProductList
          filter={byCategoryAndPrice(category.name, minPrice, maxPrice)}
          includeCategory={false}
          reset={reset}
        />
      </Subpage>
    </>
  );
}

export default withDataFetching(
  CategoryPage,
  ({ id }) => get(`/api/category?id=${id}`),
  props => ({ id: props.id })
);
