const Node = (left, value, right) => {
    return {left, value, right};
}

const Tree = (array) => {
    const root = buildTree(array);
    return {root};
}

const buildTree = (array) => {
    if (array.length > 1) {
        if (array.length % 2 === 0) {
            const left = array.slice(0, (array.length/2)-1);
            const value = array[array.length/2];
            const right = array.slice((array.length/2)+1, array.length);
            return buildTree(left, value, right);
        } else {
            const left = array1.slice(0, Math.floor(array1.length/2));
            const value = array[Math.floor(array1.length/2)]
            const right = array1.slice(Math.floor(array1.length/2));
            return buildTree(left, value, right);
        }
    } else {
        return Node(null, array[0], null);
    }
}