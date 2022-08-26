import { CURRENCY } from "lib/sharedConstants";

const CENTS_IN_DOLLAR = 100;

export function formatMoney(value) {
  return Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: CURRENCY,
  }).format(value);
}

export function formatMoneyForRazorpay(value) {
  return (value * CENTS_IN_DOLLAR).toString();
}

export function formatMoneyFromRazorpay(value) {
  return value / CENTS_IN_DOLLAR;
}
