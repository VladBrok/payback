import { escapeRegex } from "../escapeRegex";
import { Trie } from "./Trie";

let trie;

export function isFuzzySearchInitialized() {
  return Boolean(trie);
}

export function initializeFuzzySearch(items, selector) {
  if (isFuzzySearchInitialized()) {
    return;
  }

  trie = new Trie();

  for (const item of items) {
    trie.insert(item, selector);
  }
}

export function fuzzySearch(items, selector, searchQuery) {
  return trieImpl(searchQuery);
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

function trieImpl(searchQuery) {
  if (!isFuzzySearchInitialized()) {
    throw new Error(
      'You must call "initializeFuzzySearch" before performing a fuzzy search.'
    );
  }

  return trie.find(searchQuery);
}
