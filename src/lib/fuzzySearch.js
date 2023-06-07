import { escapeRegex } from "./escapeRegex";

export function fuzzySearch(items, selector, searchQuery) {
  if (!searchQuery) {
    return items;
  }

  // TODO: (in React component): "abcd".replaceAll(/[ac]/g, match => {return `<span>${match}</span>`})

  const pattern = new RegExp(
    `.*?${searchQuery
      .split("")
      .map(x => escapeRegex(`${x}`))
      .join(".*?")}.*?`,
    "i"
  );

  const result = items.filter(item => pattern.test(selector(item)));
  return result;
}
