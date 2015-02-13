var Node = require('./Node');
module.exports = LinkedList;

/**
 * A collection of Node objects.
 * @property {Node} head – The first Node object, defaults to `null`.
 * @property {Number} length - The length of the LinkedList, defaults to 0.
 */
function LinkedList () {
  this.head = null;
  this.length = 0;
}

/**
 * Appends the Node object to the end of the linked list.
 * @param  {[type]} node [description]
 * @throws {TypeError} – Should only accept other Node objects.
 * @return {[type]}      [description]
 */
LinkedList.prototype.add = function (node) {
  if (node instanceof Node) {
    if (this.length === 0) {
      this.head = node;
      this.length++;
      return this.head;
    }
    else {
      // [0, 1, 2]
      var currentNode = this.head;
      // Retrieve the last node in the linked list
      for (var i = 1; i < this.length; i++) {
        currentNode = currentNode.getNext();
      }
      // Set the next property of the last node to the param node
      currentNode.setNext(node);
      this.length++;
      return node;
    }
  }
  else {
    throw new TypeError;
  }
};

/**
 * Returns the n-th Node at the provided index.
 * @param  {Number} index – The index of the Node object.
 * @return {Node}       The Node object.
 */
LinkedList.prototype.get = function (index) {
  if (index === 0) {
    return this.head;
  }
  else {
    var currentNode = this.head;
    // Traverse the linked list to retrieve the node at the specified index
    for (var i = 1; i < this.length; i++) {
      currentNode = currentNode.getNext();
      if (index === i) {
        break;
      }
    }
    return currentNode;
  }
};

/**
 * Removes the n-th Node at the provided index.
 * @param  {Number} index – The index of the Node object.
 */
LinkedList.prototype.remove = function (index) {
  if (this.length === 1 && index === 0) {
    // Case in which node to remove is the first node in the linked list
    this.head = null;
    this.length = 0;
  }
  else {
    if (index === 0) { // If length is greater than 1 and the head is the node to remove
      // 0, 1
      var nodeToRemove = this.head;
      this.head = nodeToRemove.getNext();
      nodeToRemove = null;
      this.length--;
    }
    else {
      // [0, 1, 2, 3]
      var currentNode = this.head;
      // [11, 13]
      // Traverse the linked list to retrieve the node at the specified index
      for (var i = 1; i < this.length; i++) {
        if ((index === 1 && this.length === 2) || index === i + 1) { // Break once it reaches the index just before the node to remove
          break;
        }
        currentNode = currentNode.getNext();
      }

      var nodeToRemove = currentNode.getNext(); // 2 // last node scenario: 3
      if (this.length === index + 1) {
        // Case in which node to remove is the last node in the linked list
        currentNode.setNext(null); // last node scenario: 2.next = null
      }
      else {
        // Case in which node to remove is not the first or last node in the linked list
        currentNode.setNext(nodeToRemove.getNext()); // 1.next = 2.next (which is 3)
      }
      nodeToRemove = null; // 2 = null // last node scenario: 3 = null
      this.length--;
    }
  }
};
