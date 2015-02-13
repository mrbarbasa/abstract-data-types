module.exports = Node;

/**
 * Nodes objects contain a data value and (optionally)
 * links to other Nodes.
 * @param value – The data value associated with the Node object.
 * @property value – The default value should be set to the value passed in.
 * @property {Node} next – The default value should be set to `null`.
 */
function Node(value) {
  this.value = value;
  this.next = null;
}

/**
 * Set's the next Node object.
 * @param {Node} node – The next Node object.
 * @throws {TypeError} – Should only accept other Node objects.
 */
Node.prototype.setNext = function(node) {
  if (node instanceof Node) {
    this.next = node;
    return this.next;
  }
  else {
    throw new TypeError;
  }
};

/**
 * Returns the next Node object.
 * @return {Node} – The next Node object.
 */
Node.prototype.getNext = function() {
  return this.next;
};
