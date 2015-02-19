var LinkedList = require('./LinkedList');
var Node = require('./Node');
module.exports = Queue;

function Queue() {
  this.storage = [];
  this.length = 0;
}

// TODO: Extend LinkedList
Queue.prototype = new LinkedList();

/**
 * Enqueues the value at the beginning of the queue
 * @param  value The value to add to the queue
 */
Queue.prototype.enqueue = function (value) {
  this.storage.unshift(value);
  this.length++;
};

/**
 * Dequeues the value at the end of the queue
 * @throws {Error} – Thrown when the queue is empty
 * @return The value at the end of the queue
 */
Queue.prototype.dequeue = function () {
  if (this.length > 0) {
    return this.storage[this.length-- - 1];
  }
  else {
    throw new Error;
  }
};
