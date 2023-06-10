import STree from "@jayrbolton/suffix-tree";

const tree = STree.create("banana");
const wordIndexes = STree.findSuffix("b", tree);
console.log(wordIndexes);
