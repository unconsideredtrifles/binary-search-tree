class Node {
  #value;
  #left;
  #right;

  constructor(value) {
    this.#value = value;
    this.#left = null;
    this.#right = null;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  get left() {
    return this.#left;
  }

  set left(value) {
    this.#left = value;
  }

  get right() {
    return this.#right;
  }

  set right(value) {
    this.#right = value;
  }
}

const buildTree = function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) {
    return null;
  }

  const mid = (start + end) / 2;
  const node = new Node(arr[mid]);
  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);

  return node;
};

const printTree = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    printTree(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    printTree(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

export {
  buildTree,
  printTree,
  Node,
};
