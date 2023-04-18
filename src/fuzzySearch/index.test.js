import { assert, test } from 'vitest';
import fuzzySearch from './index.js';

test('Returns the same array if the query is empty', () => {
    const options = [
        { value: 'foo', name: 'foo' },
        { value: 'bar', name: 'bar' },
    ];

    assert.equal(fuzzySearch(options, ''), options);
});

test('Returns empty array if no options match the query', () => {
    const options = [
        { value: 'foo', name: 'foo' },
        { value: 'bar', name: 'bar' },
    ];

    assert.equal(fuzzySearch(options, 'baz').length, 0);
});

test('Can fuzzy search by name', () => {
    const options = [
        { value: 'foo', name: 'foo' },
        { value: 'bar', name: 'bar' },
    ];

    assert.equal(fuzzySearch(options, 'fo').length, 1);
    assert.equal(fuzzySearch(options, 'fo')[0].value, 'foo');
});

test('Can find similar options', () => {
    const options = [
        { value: 'foo', name: 'foo' },
        { value: 'bar', name: 'bar' },
        { value: 'baz', name: 'baz' },
    ];

    assert.equal(fuzzySearch(options, 'ba').length, 2);
    assert.equal(fuzzySearch(options, 'ba')[0].value, 'bar');
    assert.equal(fuzzySearch(options, 'ba')[1].value, 'baz');
});

test('Can find similar options with different case', () => {
    const options = [
        { value: 'foo', name: 'foo' },
        { value: 'bar', name: 'bar' },
        { value: 'baz', name: 'baz' },
    ];

    assert.equal(fuzzySearch(options, 'BA').length, 2);
    assert.equal(fuzzySearch(options, 'BA')[0].value, 'bar');
    assert.equal(fuzzySearch(options, 'BA')[1].value, 'baz');
});

test('Advanced fuzzy search', () => {
    // Countries that starts with sw
    const options = [
        { value: 'se', name: 'Sweden' },
        { value: 'ch', name: 'Switzerland' },
        { value: 'sz', name: 'Swaziland' },
    ];

    const first = fuzzySearch(options, 'sw');

    assert.equal(first.length, 3);
    assert.equal(first[0].value, 'se');
    assert.equal(first[1].value, 'ch');
    assert.equal(first[2].value, 'sz');

    const second = fuzzySearch(options, 'land');

    assert.equal(second.length, 2);
    assert.equal(second[0].value, 'ch');
    assert.equal(second[1].value, 'sz');

    const third = fuzzySearch(options, 'swi');

    assert.equal(third.length, 2);
    assert.equal(third[0].value, 'ch');
    assert.equal(third[1].value, 'sz');

    const fourth = fuzzySearch(options, 'sen');

    assert.equal(fourth.length, 2);
    assert.equal(fourth[0].value, 'se');
    assert.equal(fourth[1].value, 'ch');
});
