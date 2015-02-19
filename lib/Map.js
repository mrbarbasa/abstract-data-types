var crypto = require('crypto');
module.exports = Map;

// For advanced students.
var LinkedList = require('./LinkedList');
var Node = require('./Node');

var MAP_CAPACITY = 100;

/**
 * A simple map implementation that uses an array for storage.
 * @property storage – An array where we will store the data.
 */
function Map() {
  this.storage = [];
}

/**
 * Set the value at the provided key.
 * If you're doing the advanced tests, you will probably need a LinkedList.
 * Also, if you're doing the advanced tests, you will probably want to store
 * both the key and the value for the get implementation.
 * @param key – The key for the item we are storing.
 * @param value - The value that we are associating with the key.
 */
Map.prototype.set = function(key, value) {
  var found = false;
  var index = this._hashFunction(key);
  var currentNode = null;

  for (var i = 0; i < this.storage.length; i++) {
    var item = this.storage[i];
    if (item.mapKey === index) {
      if (this.get(key) === null) {
        // Add the new key and value
        item.mapValue.add(new Node({nodeKey: key, nodeValue: value}));
      }
      else {
        // Update the value at the given key
        currentNode = item.mapValue.head; // Set current node to start of linked list
        if (currentNode === null) {
          // Add the new key and value
          item.mapValue.add(new Node({nodeKey: key, nodeValue: value}));
        }
        while (currentNode !== null) {
          if (currentNode.value.nodeKey === key) {
            currentNode.value.nodeValue = value;
            found = true;
            break;
          }
          currentNode = currentNode.getNext();
        }
      }
    }
  }

  if (!found) {
    var linkedList = new LinkedList();
    linkedList.add(new Node({nodeKey: key, nodeValue: value}));
    this.storage.push({
      mapKey: index,
      mapValue: linkedList
    });
  }
};

/**
 * Get the value at the provided key.
 * If you're doing the advanced tests, you need to find the item matching your
 * key.
 * @param key – The key for the item.
 * @return The value associated with the key or null if it does not exist.
 */
Map.prototype.get = function(key) {
  var index = this._hashFunction(key);
  var currentNode = null;

  for (var i = 0; i < this.storage.length; i++) {
    var item = this.storage[i];
    if (item.mapKey === index) {
      currentNode = item.mapValue.head; // Set current node to start of linked list
      if (currentNode === null) {
        return null;
      }
      while (currentNode !== null) {
        if (currentNode.value.nodeKey === key) {
          return currentNode.value.nodeValue;
        }
        currentNode = currentNode.getNext();
      }
    }
  }

  return null; // If length is 0
};

/**
 * Remove the value at the provided key.
 * If you're doing the advanced tests, you need to find the item matching your
 * key.
 * @param key – The key for the item we are removing.
 * @throws Error if the key does not map to a value.
 * @return The value associated with the key.
 */
Map.prototype.remove = function(key) {
  var found = false;
  var index = this._hashFunction(key);
  var itemValue = null;
  var indexToRemove = 0;

  for (var i = 0; i < this.storage.length; i++) {
    var item = this.storage[i];
    if (item.mapKey === index) {
      currentNode = item.mapValue.head; // Set current node to start of linked list
      if (currentNode === null) {
        throw new Error;
      }
      while (currentNode !== null) {
        if (currentNode.value.nodeKey === key) {
          item.mapValue.remove(indexToRemove);
          found = true;
          break;
        }
        currentNode = currentNode.getNext();
        indexToRemove++;
      }
      if (found) {
        break;
      }
    }
  }
};

/**
 * Helper function for computing an array index with a key.
 * Note, this should not be public, but it's public so I can stub it.
 * @param key - The key for the map
 * @return An array index to be used to insert into an array.
 */
Map.prototype._hashFunction = function(key) {
  // No need to be fancy. This isn't a password
  var shasum = crypto.createHash('md5');
  shasum.update(key.toString());
  return parseInt(shasum.digest('hex'), 16) % MAP_CAPACITY;
};
