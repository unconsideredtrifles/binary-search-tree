import { Node, buildTree } from './tree-utils.js';

class Tree {
  #root;
  constructor(arr) {
    if (!Array.isArray(arr) || arr.length <= 0) {
      this.#root = null;
      return;
    }
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
    if (this.#root === null) {
      return;
    }

    this.#removeNode(this.#root, value);
  }

  #removeNode(startingNode, value, parent = null, traversedDirection = null) {
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
    if (currentNode === null) {
      return;
    }

    if (currentNode.left === null) {
      if (parentNode === null) {
        this.#root = currentNode.right;
      } else {
        parentNode[lastTraversedDirection] = currentNode.right;
      }
    } else if (currentNode.right === null) {
      if (parentNode === null) {
        this.#root = currentNode.left;
      } else {
        parentNode[lastTraversedDirection] = currentNode.left;
      }
    } else {
      const inOrderSuccessor = Tree.getInOrderSuccessor(currentNode.right);
      currentNode.value = inOrderSuccessor.value;
      this.#removeNode(
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

  find(value) {
    let currentNode = this.#root;
    while (currentNode !== null) {
      if (value === currentNode.value) {
        return currentNode;
      }
      currentNode = (
        (value < currentNode.value) ? currentNode.left : currentNode.right
      );
    }
    return null;
  }

  static checkIfFunction(arg) {
    if (arg === undefined || typeof arg !== 'function') {
      throw new Error('Please provide a callback function');
    }
  }

  levelOrder(callback) {
    Tree.checkIfFunction(callback);
    if (this.#root === null) {
      return;
    }

    let currentNode = this.#root;
    const queue = [currentNode];
    while (queue.length > 0) {
      currentNode = queue.shift();
      callback(currentNode);
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrder(callback) {
    Tree.checkIfFunction(callback);
    if (this.#root === null) {
      return;
    }

    let currentNode = this.#root;
    const stack = [];
    while (currentNode !== null || stack.length > 0) {
      if (currentNode !== null) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      } else {
        currentNode = stack.pop();
        callback(currentNode);
        currentNode = currentNode.right;
      }
    }
  }

  preOrder(callback) {
    Tree.checkIfFunction(callback);
    if (this.#root === null) {
      return;
    }

    let currentNode = this.#root;
    const stack = [];
    while (currentNode !== null || stack.length > 0) {
      if (currentNode === null) {
        currentNode = stack.pop();
        currentNode = currentNode.right;
      }
      callback(currentNode);
      if (currentNode.right !== null) {
        stack.push(currentNode);
      }
      currentNode = currentNode.left;
    }
  }

  postOrder(callback) {
    Tree.checkIfFunction(callback);
    if (this.#root === null) {
      return;
    }

    let currentNode = this.#root;
    let rightTraversed = false;
    const stack = [];
    while (currentNode !== null || stack.length > 0) {
      if (currentNode === null) {
        [currentNode, rightTraversed] = stack.pop();
        if (rightTraversed || currentNode.right === null) {
          callback(currentNode);
          currentNode = null;
        } else {
          // currentNode.right !== null
          stack.push([currentNode, true]);
          currentNode = currentNode.right;
        }
      } else {
        stack.push([currentNode, false]);
        currentNode = currentNode.left;
      }
    }
  }

  height() {
    return Tree.getHeight(this.#root);
  }

  static getHeight(node) {
    let currentNode = node;
    let maxHeight = 0;
    let currentHeight = 0;
    const stack = [];
    while (currentNode !== null || stack.length > 0) {
      if (currentNode === null) {
        const [tmpNode, rightTraversed] = stack.pop();
        if (tmpNode.right !== null && !rightTraversed) {
          stack.push([tmpNode, true]);
          currentNode = tmpNode.right;
        } else {
          currentHeight -= 1;
        }
      } else {
        stack.push([currentNode, false]);
        currentHeight += 1;
        if (currentHeight > maxHeight) {
          maxHeight = currentHeight;
        }
        currentNode = currentNode.left;
      }
    }
    return maxHeight;
  }
}

export default Tree;
