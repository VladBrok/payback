export function byNameSubstring(substr) {
  return c => c.name.includes(substr);
}
