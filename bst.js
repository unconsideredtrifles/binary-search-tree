import { printTree } from './tree-utils.js';
import Tree from './tree-obj.js';

const arr = [1, 2, 3, 4, 5, 6, 7];
const tree = new Tree(arr);
printTree(tree.root);
