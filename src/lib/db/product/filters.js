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
  const MAX_INPUT_LENGTH = 7;

  min = isValid(min) ? +min : -BIG_NUMBER;
  max = isValid(max) ? +max : BIG_NUMBER;

  return {
    AND: [
      { category: { name } },
      { price: { gte: min } },
      { price: { lte: max } },
      { isSold: false },
    ],
  };

  function isValid(value) {
    return value !== "" && value.length <= MAX_INPUT_LENGTH;
  }
}

export function byUserId(id) {
  return { userId: +id, AND: { isSold: false } };
}
