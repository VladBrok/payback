export function byPremium() {
  return { isPremium: true, AND: { isSold: false } };
}

export function bySimilar(product) {
  return {
    category: { name: product.category.name },
    AND: [{ NOT: { id: +product.id } }, { isSold: false }],
  };
}

export function byCategoryAndPrice(name, min, max) {
  min = min === "" ? -1e6 : +min;
  max = max === "" ? 1e6 : +max;

  return {
    AND: [
      { category: { name } },
      { price: { gt: min } },
      { price: { lt: max } },
      { isSold: false },
    ],
  };
}

export function byUserId(id) {
  return { userId: +id, AND: { isSold: false } };
}
