import { escapeRegex } from "../escapeRegex";

export function fuzzySearch(items, selector, searchQuery) {
  return regexImpl(items, selector, searchQuery);
}

function regexImpl(items, selector, searchQuery) {
  if (!searchQuery) {
    return items;
  }

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
