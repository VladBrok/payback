export function byPremium(product) {
  return product.isPremium;
}

export function bySimilar(product) {
  return p => p.category === product.category && p.id != product.id;
}
