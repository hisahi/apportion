/*!
 * apportion <https://github.com/hisahi/apportion>
 *
 * Copyright (c) 2019, Sampo Hippeläinen
 * Released under the MIT License
 */

const apportion = require('../src/index');

describe('apportioning arrays', () => {
  test('can apportion an evenly splitting array', () => {
    const result = apportion([1, 2, 3, 4], 2);
    expect(result).toEqual([[1, 2], [3, 4]]);
  });

  test('can apportion a not evenly splitting array', () => {
    const result = apportion([1, 2, 3, 4, 5, 6, 7], 3);
    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  test('can apportion an empty array', () => {
    const result = apportion([], 2);
    expect(result).toEqual([]);
  });

  test('can apportion a not evenly splitting array but remove incomplete', () => {
    const result = apportion([1, 2, 3, 4, 5], 2, true);
    expect(result).toEqual([[1, 2], [3, 4]]);
  });

  test('can apportion an array with overlaps', () => {
    const result = apportion([1, 2, 3, 4], 2, false, true);
    expect(result).toEqual([[1, 2], [2, 3], [3, 4], [4]]);
  });

  test('can apportion an array with overlaps but remove incomplete', () => {
    const result = apportion([1, 2, 3, 4], 2, true, true);
    expect(result).toEqual([[1, 2], [2, 3], [3, 4]]);
  });
});

describe('apportioning strings', () => {
  test('can apportion an evenly splitting string', () => {
    const result = apportion('1234', 2);
    expect(result).toEqual(['12', '34']);
  });

  test('can apportion a not evenly splitting string', () => {
    const result = apportion('12345', 2);
    expect(result).toEqual(['12', '34', '5']);
  });

  test('can apportion an empty string', () => {
    const result = apportion('', 2);
    expect(result).toEqual([]);
  });

  test('can apportion a not evenly splitting string but remove incomplete', () => {
    const result = apportion('12345', 2, true);
    expect(result).toEqual(['12', '34']);
  });

  test('can apportion a string with overlaps', () => {
    const result = apportion('ABCDE', 2, false, true);
    expect(result).toEqual(['AB', 'BC', 'CD', 'DE', 'E']);
  });

  test('can apportion a string with overlaps but remove incomplete', () => {
    const result = apportion('ABCDE', 2, true, true);
    expect(result).toEqual(['AB', 'BC', 'CD', 'DE']);
  });
});

describe('apportioning fails with invalid parameters', () => {
  test('throws an Error when no parameters', () => {
    expect(() => apportion()).toThrow(Error);
  });

  test('throws an Error when no blockSize', () => {
    expect(() => apportion([1, 2, 3])).toThrow(Error);
  });

  test('throws a TypeError when indexable is a number', () => {
    expect(() => apportion(2, 3)).toThrow(TypeError);
  });

  test('throws a Error when blockSize is not integer', () => {
    expect(() => apportion([1, 2, 3], 2.5)).toThrow(Error);
  });

  test('throws a Error when blockSize is negative', () => {
    expect(() => apportion([1, 2, 3], -2)).toThrow(Error);
  });

  test('throws a Error when blockSize is zero', () => {
    expect(() => apportion([1, 2, 3], 0)).toThrow(Error);
  });
});
