const Node = (data, left = null, right = null) => {
    return {data, left, right};
}

const Tree = (array) => {
    if (!array || !Array.isArray(array)) {
        return;
    }
    
    const buildTree = (array) => {
        if (array.length === 0) {
            return null;
        }
        const left = array.slice(0, Math.floor(array.length/2));
        const value = array[Math.floor(array.length/2)]
        const right = array.slice(Math.floor(array.length/2)+1);
        return Node(value, buildTree(left), buildTree(right));
    }

    const getRoot = () => {
        return root;
    }

    const setRoot = (newRoot) => {
        root = newRoot;
    }

    const deleteNode = (value, root = getRoot()) => {
        if (root === null) {
            return;
        }
        if (root.data != value) {
            if (root.data < value) {
                root.right = deleteNode(value, root.right);
            } else {
                root.left = deleteNode(value, root.left);
            }
        } else {
            if (!root.left) {
                return root.right;
            } if (!root.right) {
                return root.left;
            }
            root.data = getMinValue(root.right);
            root.right = deleteNode(root.data, root.right);
        }
        return root;
    }
    
    const getMinValue = (root) => {
        let minValue = root.data;
        while (root.left) {
            minValue = root.left.data;
            root = root.left;
        }
        return minValue;
    }
    
    const insertNode = (value, root = getRoot()) => {
        if (root == null) {
            return Node(value);
        } if (value > root.data) {
            root.right = insertNode(value, root.right);
        } else {
            root.left = insertNode(value, root.left);
        }
        return root;
    }
    
    const findNode = (value, root = getRoot()) => {
        if (root == null) {
            return 'Value not found';
        } if (root.data === value) {
            return root;
        } if (value > root.data) {
            return findNode(value, root.right);
        } else {
            return findNode(value, root.left);
        }
    }

    const levelOrder = (callback) => {
        let queue = [];
        let visited = [];
        const root = getRoot();
        queue.push(root)
        while (queue.length > 0) {
            visited.push(queue[0].data);
            if (callback) {
                callback(queue[0].data)
            } if (queue[0].left) {
                queue.push(queue[0].left);
            } if (queue[0].right) {
                queue.push(queue[0].right);
            }
            queue.shift();
        }
        if (!callback) {
            return visited;
        }
    }

    const postorder = (callback = null, root = getRoot()) => {
        const visited = [];
        if (root.left) {
            visited.push(postorder(callback, root.left));
        }
        if (root.right) {
            visited.push(postorder(callback, root.right));
        }
        visited.push(root.data);
        if (callback) {
            callback(root.data)
        } else {
            return visited.flat();
        }
    }

    const stackPostorder = (callback = null) => {
        const stack = [getRoot()];
        const visited = [];
        while (stack.length) {
            const root = stack.pop();
            if (root.left) {
                stack.push(root.left);
            } if (root.right) {
                stack.push(root.right);
            } if (callback) {
                callback(root.data);
            } visited.unshift(root.data)
        } return visited;
    }

    const preorder = (callback = null, root = getRoot()) => {
        const visited = [];
        visited.push(root.data);
        if (root.left) {
            visited.push(preorder(callback, root.left));
        }
        if (root.right) {
            visited.push(preorder(callback, root.right));
        }
        if (callback) {
            callback(root.data);
        } else {
            return visited.flat();
        }
    }

    const stackPreorder = (callback = null) => {
        const stack = [getRoot()];
        const visited = [];
        while (stack.length) {
            const root = stack.pop();
            visited.push(root.data);
            if (callback) {
                callback(root.data);
            } if (root.right) {
                stack.push(root.right);
            } if (root.left) {
                stack.push(root.left);
            }
        } return visited;
    }

    const inorder = (callback = null, root = getRoot()) => {
        const visited = [];
        if (root.left) {
            visited.push(inorder(callback, root.left));
        }
        visited.push(root.data);
        if (root.right) {
            visited.push(inorder(callback, root.right));
        } if (callback) {
            callback(root.data)
        } else {
            return visited.flat();
        }
    }

    const stackInorder = (callback = null) => {
        const stack = [];
        const visited = [];
        let root = getRoot();
        while (root || stack.length > 0) {
            if (root) {
                stack.push(root);
                root = root.left;
            } else {
                root = stack.pop();
                visited.push(root.data);
                if (callback) {
                    callback(root.data);
                }
                root = root.right;
            }
        }
        return visited;
    }

    const height = (root = getRoot()) => {
        if (root) {
            const leftHeight = height(root.left);
            const rightHeight = height(root.right);
            return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
        } else {
            return -1;
        }
    }

    const depth = (value, root = getRoot()) => {
        if (root == null) {
            return 'Value not found';
        } if (root.data === value) {
            return 0;
        } if (value > root.data) {
            return depth(value, root.right)+1;
        } else {
            return depth(value, root.left)+1;
        }
    }

    const isBalanced = (root = getRoot()) => {
        const left = height(root.left);
        const right = height(root.right);
        const diff = left-right;
        if (diff >= -1 && diff <= 1) {
            return true;
        } else {
            return false;
        }
    }

    const rebalance = () => {
        const newRoot = stackInorder();
        setRoot(buildTree(newRoot));
    }

    const sortedArray = array.sort((a, b) => a - b);
    const filteredArray = sortedArray.filter((value, index) => sortedArray.indexOf(value) === index);
    let root = buildTree(filteredArray);

    const obj = {
        getRoot,
        deleteNode,
        insertNode,
        findNode,
        levelOrder,
        postorder,
        stackPostorder,
        preorder,
        stackPreorder,
        inorder,
        stackInorder,
        height,
        depth,
        isBalanced,
        rebalance,
    }

    return obj;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// Verification

const getRandomIntUnder100 = () => {
    return Math.floor(Math.random() * (Math.random() * 99)) + 1;
}

const createRandomArray = () => {
    // returns array of random length with random elements both in range 1-100
    const array = Array.from({ length: getRandomIntUnder100() }, () => getRandomIntUnder100())
    return array;
}

const test = Tree(createRandomArray());
prettyPrint(test.getRoot());
console.log(`Tree should be balanced. Tree is ${test.isBalanced() 
    ? 'balanced' : `unbalanced`}.`)
console.log(`Level order:\n${test.levelOrder()}`);
console.log(`Preorder:\n${test.preorder()}`);
console.log(`Postorder:\n${test.postorder()}`);
console.log(`Inorder:\n${test.inorder()}`);
test.insertNode(getRandomIntUnder100() + 100);
test.insertNode(getRandomIntUnder100() + 100);
test.insertNode(getRandomIntUnder100() + 100);
console.log(`Tree is most likely to be unbalanced. Tree is ${test.isBalanced() 
    ? 'balanced' : `unbalanced`}.`);
test.rebalance();
console.log(`Tree should be balanced. Tree is ${test.isBalanced() 
    ? 'balanced' : `unbalanced`}.`);
console.log(`Level order:\n${test.levelOrder()}`);
console.log(`Preorder:\n${test.preorder()}`);
console.log(`Postorder:\n${test.postorder()}`);
console.log(`Inorder:\n${test.inorder()}`);