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

  delete(value) {
    // find the node to delete
    // check if the node is left-nulled or right-nulled or both.
    // If left-nulled, make its parent point to its right.
    // If right-nulled, make its parent point to its left.

    if (this.#root === null) {
      return;
    }

    Tree.removeNode(this.#root, value);
  }

  static removeNode(startingNode, value, parent = null, traversedDirection = null) {
    let currentNode = startingNode;
    let parentNode = parent;
    let lastTraversedDirection = traversedDirection;

    while (currentNode !== null) {
      if (value === currentNode.value) {
        break;
      }
      parentNode = currentNode;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
        lastTraversedDirection = 'left';
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
        lastTraversedDirection = 'right';
      }
    }

    if (currentNode.left === null) {
      parentNode[lastTraversedDirection] = currentNode.right;
    } else if (currentNode.right === null) {
      parentNode[lastTraversedDirection] = currentNode.left;
    } else {
      const inOrderSuccessor = Tree.getInOrderSuccessor(currentNode.right);
      currentNode.value = inOrderSuccessor.value;
      Tree.removeNode(
        currentNode.right,
        inOrderSuccessor.value,
        currentNode,
        'right',
      );
    }
  }

  static getInOrderSuccessor(node) {
    let currentNode = node;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }
}

export default Tree;
