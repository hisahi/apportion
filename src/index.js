/*!
 * apportion <https://github.com/hisahi/apportion>
 *
 * Copyright (c) 2019, Sampo Hippeläinen
 * Released under the MIT License
 */

const apportion = function apportion(indexable, blockSize,
  onlyComplete = false, overlapping = false) {
  if (typeof indexable.slice !== 'function' || typeof indexable.length !== 'number') {
    throw new TypeError('expected a value with a .slice() and numeric .length');
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
