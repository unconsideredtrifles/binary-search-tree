import Tree from './tree-obj.js';

class RandNumGenerator {
  #randNumPool = [];

  constructor(totalItems = 10) {
    let numCount = 0;
    while (numCount < totalItems) {
      const randNum = this.constructor.getRandomNum(totalItems);
      if (!this.#randNumPool.includes(randNum)) {
        this.#randNumPool.push(randNum);
        numCount += 1;
      }
    }
  }

  generate() {
    return this.#randNumPool.sort((num1, num2) => {
      if (num1 > num2) {
        return 1;
      }
      if (num1 < num2) {
        return -1;
      }
      return 0;
    });
  }

  static getRandomNum(maxNum) {
    return Math.floor(Math.random() * (maxNum + 1));
  }
}

const randGen = new RandNumGenerator(100);
const tree = new Tree(randGen.generate());

console.log('Checking if the tree is balanced...');
if (tree.isBalanced()) {
  console.log('The tree is balanced');
} else {
  throw new Error('The tree is unbalanced. Somethine went wrong');
}

const printNode = (eachNode) => {
  console.log(eachNode.value);
};

console.log('Printing the tree in postorder...');
tree.postOrder(printNode);
console.log('Printing the tree in preorder...');
tree.preOrder(printNode);
console.log('Printing the tree in inorder...');
tree.inOrder(printNode);

for (let i = 110; i < 180; i += 1) {
  tree.insert(i);
}

console.log('Checking if the tree is unbalanced...');
if (!tree.isBalanced()) {
  console.log('The tree is unbalanced!');
} else {
  throw new Error('The tree shouldn\' be balanced. Something went wrong');
}
console.log('Rebalancing the tree...');
tree.rebalance();
if (tree.isBalanced()) {
  console.log('The tree is now reblanaced!');
} else {
  throw new Error('The tree is unblanaced. Something went wrong.');
}
