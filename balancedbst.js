const Node = (data, left = null, right = null) => {
    return {data, left, right};
}

const Tree = (array) => {
    if (!array || !Array.isArray(array)) {
        return;
    }
    const sortedArray = array.sort((a, b) => a - b);
    const filteredArray = sortedArray.filter((value, index) => sortedArray.indexOf(value) === index);
    const root = buildTree(filteredArray);

    const getRoot = () => {
        return root;
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
    
    const getMinValue = () => {
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
                root = root.right;
                if (callback) {
                    callback(root.data);
                }
            }
        }
        return visited;
    }

    return { root,
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
     }
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

const test = Tree([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
prettyPrint(test.root);



function inorderTraversal(root) {
    const stack = [];
    const result = [];
  
    let current = root;
  
    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
  
      current = stack.pop();
      result.push(current.val);
  
      current = current.right;
    }
  
    return result;
  }

  function preorderTraversal(root) {
    const stack = [];
    const result = [];
  
    if (!root) {
      return result;
    }
  
    stack.push(root);
  
    while (stack.length > 0) {
      const current = stack.pop();
      result.push(current.val);
  
      // Push right child first since it will be processed after the left child
      if (current.right) {
        stack.push(current.right);
      }
  
      if (current.left) {
        stack.push(current.left);
      }
    }
  
    return result;
  }
  