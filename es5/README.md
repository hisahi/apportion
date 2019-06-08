# apportion-es5 [![NPM version](https://img.shields.io/npm/v/apportion-es5.svg?style=flat)](https://www.npmjs.com/package/apportion-es5)
Apportions arrays or strings into blocks of the requested size.

## Install
Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save apportion-es5
```

## Usage
```js
var apportion = require('apportion-es5');
// apportion(indexable, blockSize, onlyComplete = false, overlapping = false)

console.log(apportion([1, 2, 3, 4, 5], 2));          // => [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
console.log(apportion([1, 2, 3, 4, 5], 3));          // => [ [ 1, 2, 3 ], [ 4, 5 ] ]

console.log(apportion('ABCDEFG', 3));                // => [ 'ABC', 'DEF', 'G' ]
```

By default, incomplete elements (those that have a length less than the requested block size) are also supplied, but they can also be removed:

```js
console.log(apportion([1, 2, 3, 4, 5], 2, true));    // => [ [ 1, 2 ], [ 3, 4 ] ]
console.log(apportion('ABCDE', 2, true));            // => [ 'AB', 'CD' ]
```

You can also apportion in an overlapping fashion:

```js
console.log(apportion([1, 2, 3], 2, false, true));   // => [ [ 1, 2 ], [ 2, 3 ], [ 3 ] ]
console.log(apportion('ABCDE', 2, true, true));      // => [ 'AB', 'BC', 'CD', 'DE' ]
```

This version is designed for ECMAScript 5 (ES5) and can only apportion arrays or strings. [apportion](https://www.npmjs.com/package/apportion) is recommended for ECMAScript 2015 (ES6/ES2015) and above.

## Tests
```sh
$ npm test
```
Implemented using [jest](https://jestjs.io/).

## License
MIT license: see [LICENSE](https://github.com/hisahi/apportion/blob/master/LICENSE).
