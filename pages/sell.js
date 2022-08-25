import { getCategories } from "lib/db/category";
import { withServerProps } from "lib/serverSide";

export { default } from "components/SellPage";

export async function getServerSideProps(context) {
  return withServerProps(
    () => ({
      categories: () => getCategories(),
      serviceChargesPercent: process.env.SERVICE_CHARGES_PERCENT,
      premiumCost: process.env.PREMIUM_COST,
      minPrice: process.env.MIN_PRICE,
      maxPrice: process.env.MAX_PRICE,
    }),
    context,
    true
  );
}
