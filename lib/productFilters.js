export function byPremium() {
  return { isPremium: true, AND: { isSold: false } };
}

export function bySimilar(product) {
  return {
    category: product.category,
    AND: { NOT: { id: product.id } },
    AND: { isSold: false },
  };
}

export function byCategoryAndPrice(name, min, max) {
  min = min === "" ? Number.MIN_VALUE : min;
  max = max === "" ? Number.MAX_VALUE : max;

  return {
    category: name,
    AND: { price: { gte: { min } } },
    AND: { price: { lte: { max } } },
    AND: { isSold: false },
  };
}

export function byUserId(id) {
  return { userId: id, AND: { isSold: false } };
}
