import Subpage from "components/Subpage";
import Category from "components/Category";
import ProductList from "components/ProductList";
import PriceRange from "components/PriceRange";
import withDataFetching from "components/withDataFetching";
import { get } from "lib/api/client";
import { byCategoryAndPrice } from "lib/db/product/filters";
import Head from "next/head";
import { useState, useEffect, useMemo, useCallback } from "react";
import { debounce } from "lib/debounce";

function CategoryPage({ fetchedData: category, products }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const handleMinPriceChange = useCallback(e => {
    handlePriceChange(setMinPrice, e);
  }, []);

  const handleMaxPriceChange = useCallback(
    e => handlePriceChange(setMaxPrice, e),
    []
  );

  function handlePriceChange(setter, e) {
    setter(e.target.value.trim());
    setReset(true);
  }

  const handleMinPriceChangeDebounced = useMemo(
    () => debounce(handleMinPriceChange),
    [handleMinPriceChange]
  );

  const handleMaxPriceChangeDebounced = useMemo(
    () => debounce(handleMaxPriceChange),
    [handleMaxPriceChange]
  );

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
          onMinChange={handleMinPriceChangeDebounced}
          onMaxChange={handleMaxPriceChangeDebounced}
        />
        <ProductList
          filter={byCategoryAndPrice(category.name, minPrice, maxPrice)}
          data={products}
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
