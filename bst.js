import { printTree } from './tree-utils.js';
import Tree from './tree-obj.js';

const arr = [1, 2, 3, 4, 5, 6, 7];
const tree = new Tree(arr);
tree.insert(8);
printTree(tree.root);
console.log('Removing \'13\' from the tree');
tree.delete(13);
printTree(tree.root);

const printNodeValue = function printNodeValue(node) {
  console.log(node.value);
};
tree.levelOrder(printNodeValue);
