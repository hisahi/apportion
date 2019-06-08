/*!
 * apportion <https://github.com/hisahi/apportion>
 * ES5 compatible version
 *
 * Copyright (c) 2019, Sampo Hippeläinen
 * Released under the MIT License
 */

var required = function thisParameterIsRequired() {
  throw new Error('indexable, blockSize required');
};

var isArray = function isArray(object) {
  return Object.prototype.toString.call(object) === '[object Array]';
};

var sliceArray = function sliceArray(indexable, start, end) {
  var result = [];
  var index = start;
  if (end > indexable.length) {
    end = indexable.length;
  }
  while (index < end) {
    result.push(indexable[index++]);
  }
  return result;
};

var sliceString = function sliceString(indexable, start, end) {
  if (indexable.substring) {
    return indexable.substring(start, end);
  } else {
    return indexable.substr(start, end - start);
  }
};

var apportion = function apportion_es5(indexable, blockSize,
  onlyComplete, overlapping) {
  var increment;
  var portions;
  var index;
  var portion;
  var slice;

  if (typeof indexable === 'undefined' || typeof blockSize === 'undefined') {
    return required();
  }
  onlyComplete = onlyComplete || false;
  overlapping = overlapping || false;

  if (isArray(indexable)) {
    slice = sliceArray;
  } else if (typeof indexable === 'string') {
    slice = sliceString;
  } else {
    throw new TypeError('indexable must be a string or array');
  }
  if (blockSize <= 0
    || blockSize !== (0 | blockSize)) {
    throw new Error('blockSize must be a positive integer');
  }

  increment = overlapping ? 1 : blockSize;
  portions = [];
  index = 0;
  while (index < indexable.length) {
    portion = slice(indexable, index, index + blockSize);
    if (!onlyComplete || portion.length === blockSize) {
      portions.push(portion);
    }
    index += increment;
  }
  return portions;
};

module.exports = apportion;
