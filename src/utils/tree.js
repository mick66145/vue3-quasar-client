// https://my.oschina.net/u/3024426/blog/5165582

class TreeNode {
  constructor (id, name) {
    this.id = id
    this.name = name
    this.children = []
    this.selectable = true
  }

  addChild (childNode) {
    this.children.push(childNode)
  }
}

export const buildTree = (arr, parentId = null) => {
  const tree = []
  for (const item of arr) {
    if (item.parentId === parentId) {
      const node = new TreeNode(item.id, item.name)
      const children = buildTree(arr, item.id)
      node.children = children
      tree.push(node)
    }
  }
  return tree
}

// 廣度優先
export const breadthFirstSearch = (tree, func) => {
  let node; const list = [...tree]
  // eslint-disable-next-line no-cond-assign
  while (node = list.shift()) {
    func(node)
    node.childs && list.push(...node.childs)
  }
}
