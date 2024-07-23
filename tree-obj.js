import { buildTree } from './tree-utils.js';

class Tree {
  #root;
  constructor(arr) {
    this.#root = buildTree(arr);
  }

  get root() {
    return this.#root;
  }
}

export default Tree;
