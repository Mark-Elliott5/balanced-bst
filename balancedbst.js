const Node = (data, left = null, right = null) => {
    return {data, left, right};
}

const Tree = (array) => {
    const sortedArray = array.sort((a, b) => a - b);
    const filteredArray = sortedArray.filter((value, index) => sortedArray.indexOf(value) === index);
    const root = buildTree(filteredArray);
    return root;
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

const deleteNode = (value, tree) => {
    if (tree === null) {
        return;
    }
    if (tree.data != value) {
        if (tree.data < value) {
            tree.right = deleteNode(value, tree.right);
        } else {
            tree.left = deleteNode(value, tree.left);
        }
    } else {
        if (!tree.left) {
            return tree.right;
        } if (!tree.right) {
            return tree.left;
        }
        tree.data = getMinValue(tree.right);
        tree.right = deleteNode(tree.data, tree.right);
    }
    prettyPrint(tree);
    return tree;
}

const getMinValue = (tree) => {
    let minValue = tree.data;
    while (tree.left) {
        minValue = tree.left.data;
        tree = tree.left;
    }
    return minValue;
}

const test = Tree([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
prettyPrint(test);
