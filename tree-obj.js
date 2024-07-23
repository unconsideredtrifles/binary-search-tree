import { Node, buildTree } from './tree-utils.js';

class Tree {
  #root;
  constructor(arr) {
    this.#root = buildTree(arr);
  }

  get root() {
    return this.#root;
  }

  insert(value) {
    if (this.#root === null) {
      this.#root = new Node(value);
      return;
    }

    let currentNode = this.#root;
    let nodeDirection = (value < currentNode.value) ? 'left' : 'right';
    while (currentNode[nodeDirection] !== null) {
      currentNode = currentNode[nodeDirection];
      if (value < currentNode.value) {
        nodeDirection = 'left';
      } else if (value > currentNode.value) {
        nodeDirection = 'right';
      } else {
        throw new Error('no duplicate insertion pls');
      }
    }
    currentNode[nodeDirection] = new Node(value);
  }
}

export default Tree;
