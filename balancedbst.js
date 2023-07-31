const Node = (data, left = null, right = null) => {
    return {data, left, right};
}

const Tree = (array) => {
    debugger;
    array.sort((a, b) => a - b);
    const root = buildTree(array);
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
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const test = buildTree([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
prettyPrint(test);

