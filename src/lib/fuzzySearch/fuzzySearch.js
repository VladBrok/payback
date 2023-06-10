import { randomNumber } from "../random";
import { escapeRegex } from "../escapeRegex";
import { Trie } from "./Trie";

let trie;

export function isFuzzySearchInitialized() {
  return Boolean(trie);
}

export function initializeFuzzySearch(items, selector) {
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

function testPerformance() {
  let wordCount = 10;
  const TEST_COUNT = 3;
  for (let i = 0; i < TEST_COUNT; i++) {
    console.log(`test #${i + 1}`);

    const words = getRandomWords(wordCount);
    const searchQueries = getRandomSearchQueries(wordCount);

    console.time("regex implementation");
    for (const query of searchQueries) {
      regexImpl(words, x => x, query);
    }
    console.timeEnd("regex implementation");

    console.time("trie implementation");
    initializeFuzzySearch(words, x => x);
    for (const query of searchQueries) {
      trieImpl(query);
    }
    console.timeEnd("trie implementation");
    console.log();
    // wordCount *= 2;
  }
}

const MIN_WORD_LEN = 5;
const MAX_WORD_LEN = 10;
const LETTERS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function getRandomWords(count, minLen = MIN_WORD_LEN, maxLen = MAX_WORD_LEN) {
  const words = Array(count)
    .fill(null)
    .map(() => "");

  for (let i = 0; i < count; i++) {
    const letterCount = randomNumber(minLen, maxLen);
    for (let j = 0; j < letterCount; j++) {
      const letterIdx = randomNumber(0, LETTERS.length);
      words[i] += LETTERS[letterIdx];
    }
  }

  return words;
}

function getRandomSearchQueries(count) {
  return getRandomWords(
    count,
    Math.floor(MIN_WORD_LEN / 2),
    Math.floor(MAX_WORD_LEN / 2)
  );
}

// testPerformance();
