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
  min = min === "" ? Number.MIN_VALUE : +min;
  max = max === "" ? Number.MAX_VALUE : +max;

  return {
    category: { name },
    AND: [{ price: { gte: min } }, { price: { lte: max } }, { isSold: false }],
  };
}

export function byUserId(id) {
  return { userId: +id, AND: { isSold: false } };
}
