var LinkedList = require('./LinkedList');
var Node = require('./Node');
module.exports = Stack;

function Stack() {
  this.storage = [];
  this.length = 0;
}

// TODO: Extend LinkedList
Stack.prototype = new LinkedList();

/**
 * Pushes the value onto the top of the stack
 * @param  value The value to add to the stack
 */
Stack.prototype.push = function (value) {
  this.storage.push(value);
  this.length++;
};

/**
 * Pops the value on top of the stack
 * @throws {Error} – Thrown when the stack is empty
 * @return The value on top of the stack
 */
Stack.prototype.pop = function () {
  if (this.length > 0) {
    this.length--;
    return this.storage.pop();
  }
  else {
    throw new Error;
  }
};

/**
 * Peek at the value on top of the stack
 * @throws {Error} – Thrown when the stack is empty
 * @return The value on top of the stack
 */
Stack.prototype.peek = function () {
  if (this.length > 0) {
    return this.storage[0];
  }
  else {
    throw new Error;
  }
}