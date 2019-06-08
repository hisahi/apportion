/*!
 * apportion <https://github.com/hisahi/apportion>
 *
 * Copyright (c) 2019, Sampo Hippeläinen
 * Released under the MIT License
 */

var apportion = require('../src/index');

describe('apportioning arrays', function() {
  test('can apportion an evenly splitting array', function() {
    var result = apportion([1, 2, 3, 4], 2);
    expect(result).toEqual([[1, 2], [3, 4]]);
  });

  test('can apportion a not evenly splitting array', function() {
    var result = apportion([1, 2, 3, 4, 5, 6, 7], 3);
    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  test('can apportion an empty array', function() {
    var result = apportion([], 2);
    expect(result).toEqual([]);
  });

  test('can apportion a not evenly splitting array but remove incomplete', function() {
    var result = apportion([1, 2, 3, 4, 5], 2, true);
    expect(result).toEqual([[1, 2], [3, 4]]);
  });

  test('can apportion an array with overlaps', function() {
    var result = apportion([1, 2, 3, 4], 2, false, true);
    expect(result).toEqual([[1, 2], [2, 3], [3, 4], [4]]);
  });

  test('can apportion an array with overlaps but remove incomplete', function() {
    var result = apportion([1, 2, 3, 4], 2, true, true);
    expect(result).toEqual([[1, 2], [2, 3], [3, 4]]);
  });
});

describe('apportioning strings', function() {
  test('can apportion an evenly splitting string', function() {
    var result = apportion('1234', 2);
    expect(result).toEqual(['12', '34']);
  });

  test('can apportion a not evenly splitting string', function() {
    var result = apportion('12345', 2);
    expect(result).toEqual(['12', '34', '5']);
  });

  test('can apportion an empty string', function() {
    var result = apportion('', 2);
    expect(result).toEqual([]);
  });

  test('can apportion a not evenly splitting string but remove incomplete', function() {
    var result = apportion('12345', 2, true);
    expect(result).toEqual(['12', '34']);
  });

  test('can apportion a string with overlaps', function() {
    var result = apportion('ABCDE', 2, false, true);
    expect(result).toEqual(['AB', 'BC', 'CD', 'DE', 'E']);
  });

  test('can apportion a string with overlaps but remove incomplete', function() {
    var result = apportion('ABCDE', 2, true, true);
    expect(result).toEqual(['AB', 'BC', 'CD', 'DE']);
  });
});

describe('apportioning fails with invalid parameters', function() {
  test('throws an Error when no parameters', function() {
    expect(function() {
      apportion();
    }).toThrow(Error);
  });

  test('throws an Error when no blockSize', function() {
    expect(function() {
      apportion([1, 2, 3]);
    }).toThrow(Error);
  });

  test('throws a TypeError when indexable is a number', function() {
    expect(function() {
      apportion(2, 3);
    }).toThrow(TypeError);
  });

  test('throws an Error when blockSize is not integer', function() {
    expect(function() {
      apportion([1, 2, 3], 2.5);
    }).toThrow(Error);
  });

  test('throws an Error when blockSize is negative', function() {
    expect(function() {
      apportion([1, 2, 3], -2);
    }).toThrow(Error);
  });

  test('throws an Error when blockSize is zero', function() {
    expect(function() {
      apportion([1, 2, 3], 0);
    }).toThrow(Error);
  });
});
