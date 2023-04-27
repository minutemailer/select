import { expect, test } from 'vitest';
import isValidValue from './index.js';

test('Can validate a value', () => {
    expect(isValidValue('hello')).toEqual(true);
    expect(isValidValue(0)).toEqual(true);
    expect(isValidValue(false)).toEqual(true);
    expect(isValidValue(null)).toEqual(false);
    expect(isValidValue(undefined)).toEqual(false);
});
