export function byPremium() {
  return { isPremium: true, AND: { isSold: false } };
}

export function bySimilar(product) {
  return {
    category: { name: product.category.name },
    AND: [{ NOT: { id: +product.id } }, { isSold: false }],
  };
}

export function byCategoryAndPrice(name, min = "", max = "") {
  const BIG_NUMBER = 1e6;
  const MIN = -BIG_NUMBER;
  const MAX = BIG_NUMBER;

  min = isEmpty(min) ? MIN : clamp(+min);
  max = isEmpty(max) ? MAX : clamp(+max);

  return {
    AND: [
      { category: { name } },
      { price: { gte: min } },
      { price: { lte: max } },
      { isSold: false },
    ],
  };

  function isEmpty(value) {
    return value === "";
  }

  function clamp(value) {
    return Math.max(Math.min(value, MAX), MIN);
  }
}

export function byUserId(id) {
  return { userId: +id, AND: { isSold: false } };
}
