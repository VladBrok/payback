const FORMATTER = Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

export function formatPrice(value) {
  return FORMATTER.format(value);
}
