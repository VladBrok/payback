export { default } from "components/SellPage";

export async function getStaticProps() {
  return {
    props: {
      serviceChargesPercent: process.env.SERVICE_CHARGES_PERCENT,
      premiumCost: process.env.PREMIUM_COST,
    },
  };
}
