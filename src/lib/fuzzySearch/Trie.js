class TrieNode {
  constructor(itemIndexes, letterToChildNodeMap) {
    this.itemIndexes = itemIndexes;
    this.letterToChildNodeMap = letterToChildNodeMap;
  }
}

export class Trie {
  #root;
  items;
  #nodeCount;

  constructor() {
    this.#root = new TrieNode([], new Map());
    this.items = [];
    this.#nodeCount = 0;
  }

  insert(item, selector) {
    let node = this.#root;
    const word = selector(item).toLowerCase();
    this.items.push(item);
    this.#insertRec(node, word, 0, this.items.length - 1);
  }

  #insertRec(node, word, letterIdx, itemIdx) {
    for (let i = letterIdx; i < word.length; i++) {
      const letter = word[i];
      const existingNode = node.letterToChildNodeMap.get(letter);

      if (existingNode) {
        existingNode.itemIndexes.push(itemIdx);
        this.#insertRec(existingNode, word, i + 1, itemIdx);
      } else {
        const newNode = new TrieNode([itemIdx], new Map());
        this.#nodeCount++;
        node.letterToChildNodeMap.set(letter, newNode);
        this.#insertRec(newNode, word, i + 1, itemIdx);
      }
    }
  }

  find(query) {
    console.log("node count:", this.#nodeCount); // TODO: remove

    if (!query) {
      return [...this.items.values()];
    }

    const lowerCaseQuery = query.toLowerCase();
    const resultNode = this.#findRec(this.#root, lowerCaseQuery, 0);

    if (!resultNode) {
      return [];
    }

    const items = [...new Set(resultNode.itemIndexes)].map(idx => {
      const item = this.items[idx];
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
    console.log("node count:", this.#nodeCount);
    // TODO
    // this.#printRec(this.#root);
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

trie.insert({ banana: "abcde" }, el => el.banana);
trie.insert({ banana: "ecko" }, el => el.banana);
trie.printForDebug();
// console.log(trie.find("abd"));
// console.log(trie.find("add"));
// console.log(trie.find("Ad"));
// console.log(trie.find("dd"));
// console.log(trie.find("ab"));
// console.log(trie.find("a"));
// console.log(trie.find("d"));
// console.log(trie.find("b"));
