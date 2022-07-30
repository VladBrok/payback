export function byPremium(product) {
  return product.isPremium;
}

export function bySimilar(product) {
  return p => p.category === product.category && p.id != product.id;
}

export function byCategoryAndPrice(name, min, max) {
  min = min === "" ? Number.MIN_VALUE : min;
  max = max === "" ? Number.MAX_VALUE : max;
  return p => p.category === name && p.price >= min && p.price <= max;
}

export function byUserId(id) {
  return p => p.userId == id;
}
