import Subpage from "../../components/Subpage";
import Category from "../../components/Category";
import ProductList from "../../components/ProductList";
import PriceRange from "../../components/PriceRange";
import categories from "../../data/categories.json";
import { byName } from "../../lib/categoryFinders";
import { byCategoryAndPrice } from "../../lib/productFilters";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function CategoryPage() {
  const router = useRouter();
  const { name: categoryName } = router.query;
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
        <title>Buy {categoryName}</title>
      </Head>
      <Subpage
        /* fixme: dup */
        title={
          <Category
            flexDirection="row" // todo: make default
            imageSizeIncrease="0px" // todo: make default
            name={categoryName}
            imageUrl={categories.find(byName(categoryName)).imageUrl} // todo: incapsulate
          />
        }
      >
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
  );
}

function extractValue(e) {
  return e.target.value;
}
