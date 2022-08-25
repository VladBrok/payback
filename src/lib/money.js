import { CURRENCY } from "lib/sharedConstants";

const CENTS_IN_DOLLAR = 100;

const FORMATTER = Intl.NumberFormat(undefined, {
  style: "currency",
  currency: CURRENCY,
});

export function formatMoney(value) {
  return FORMATTER.format(value);
}

export function formatMoneyForRazorpay(value) {
  return (value * CENTS_IN_DOLLAR).toString();
}

export function formatMoneyFromRazorpay(value) {
  return value / CENTS_IN_DOLLAR;
}
