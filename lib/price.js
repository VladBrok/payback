import { CURRENCY } from "lib/sharedConstants";

const FORMATTER = Intl.NumberFormat(undefined, {
  style: "currency",
  currency: CURRENCY,
});

export function formatPrice(value) {
  return FORMATTER.format(value);
}
