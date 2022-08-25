export function uniqueById(data) {
  const seen = new Set();
  return data.filter(x => {
    if (seen.has(x.id)) {
      return false;
    }
    seen.add(x.id);
    return true;
  });
}
