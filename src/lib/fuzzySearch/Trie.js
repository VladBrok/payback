class TrieNode {
  constructor(letter, words, letterToChildNodeMap) {
    this.letter = letter;
    this.words = words;
    this.letterToChildNodeMap = letterToChildNodeMap;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode("", new Set(), new Map());
    this.wordToItemMap = new Map();
  }

  insert(item, selector) {
    let node = this.root;
    const word = selector(item).toLowerCase();
    this.wordToItemMap.set(word, item);
    this.#insertRec(node, word, word);
  }

  #insertRec(node, word, substr) {
    for (let i = 0; i < substr.length; i++) {
      const letter = substr[i];
      const existingNode = node.letterToChildNodeMap.get(letter);

      if (existingNode) {
        existingNode.words.add(word);
        this.#insertRec(existingNode, word, substr.slice(i + 1));
      } else {
        const newNode = new TrieNode(letter, new Set([word]), new Map());
        node.letterToChildNodeMap.set(letter, newNode);
        this.#insertRec(newNode, word, substr.slice(i + 1));
      }
    }
  }

  find(query) {
    if (!query) {
      return [...this.wordToItemMap.values()];
    }

    const lowerCaseQuery = query.toLowerCase();
    const resultNode = this.#findRec(this.root, lowerCaseQuery, 0);

    if (!resultNode) {
      return [];
    }

    const items = [...resultNode.words].map(word => {
      const item = this.wordToItemMap.get(word);
      console.assert(item);
      return item;
    });

    return items;
  }

  #findRec(node, query, queryIdx) {
    if (queryIdx >= query.length) {
      return node;
    }

    const letter = query[queryIdx];
    const childNode = node.letterToChildNodeMap.get(letter);

    if (!childNode) {
      return null;
    }

    return this.#findRec(childNode, query, queryIdx + 1);
  }

  printForDebug() {
    this.#printRec(this.root);
  }

  #printRec(node) {
    console.log(node);
    console.log();
    for (const child of node.letterToChildNodeMap.values()) {
      this.#printRec(child);
    }
  }
}

// TODO: remove (it's for testing)
const trie = new Trie();
trie.insert({ banana: "coco", additional: true }, el => el.banana);
trie.insert({ banana: "bobcz" }, el => el.banana);
// trie.printForDebug();
console.log(trie.find(""));

// trie.insert({ banana: "abd" }, el => el.banana);
// trie.insert({ banana: "aDd" }, el => el.banana);
// // trie.printForDebug();
// console.log(trie.find("abd"));
// console.log(trie.find("add"));
// console.log(trie.find("Ad"));
// console.log(trie.find("dd"));
// console.log(trie.find("ab"));
// console.log(trie.find("a"));
// console.log(trie.find("d"));
// console.log(trie.find("b"));
