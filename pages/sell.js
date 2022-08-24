import { getCategories } from "lib/db/category";
import { fetchServerSide } from "lib/serverSide";

export { default } from "components/SellPage";

export async function getStaticProps() {
  const result = await fetchServerSide(getCategories);
  if (result.error) {
    throw new Error();
  }

  return {
    props: {
      categories: result.data,
      serviceChargesPercent: process.env.SERVICE_CHARGES_PERCENT,
      premiumCost: process.env.PREMIUM_COST,
      minPrice: process.env.MIN_PRICE,
      maxPrice: process.env.MAX_PRICE,
    },
  };
}
