/*!
 * apportion <https://github.com/hisahi/apportion>
 *
 * Copyright (c) 2019, Sampo Hippeläinen
 * Released under the MIT License
 */

const required = function thisParameterIsRequired() {
  throw new Error('indexable, blockSize required');
};

const apportion = function apportion(indexable = required(),
  blockSize = required(), onlyComplete = false, overlapping = false) {
  if (typeof indexable.slice !== 'function'
    || typeof indexable.length !== 'number') {
    throw new TypeError('indexable must have a .slice() and numeric .length');
  }
  if (blockSize <= 0
    || !Number.isInteger(blockSize)) {
    throw new TypeError('blockSize must be a positive integer');
  }

  const increment = overlapping ? 1 : blockSize;
  const portions = [];
  let index = 0;
  while (index < indexable.length) {
    const portion = indexable.slice(index, index + blockSize);
    if (!onlyComplete || portion.length === blockSize) {
      portions.push(portion);
    }
    index += increment;
  }
  return portions;
};

module.exports = apportion;
