export function getRoot(path) {
  const secondSlashIndex = path.indexOf("/", 1);
  if (secondSlashIndex !== -1) {
    return path.slice(0, secondSlashIndex);
  }
  return path;
}
