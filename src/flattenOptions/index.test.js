import { assert, test } from 'vitest';
import flattenOptions from './index.js';

test('Can flatten grouped options', () => {
    const options = [
        {
            type: 'group',
            name: 'Group 1',
            items: [{ value: 'foo', name: 'foo' }],
        },
        {
            type: 'group',
            name: 'Group 2',
            items: [{ value: 'bar', name: 'bar' }],
        },
    ];

    assert.equal(flattenOptions(options).length, 2);
    assert.equal(flattenOptions(options)[0].value, 'foo');
    assert.equal(flattenOptions(options)[0].group, 'Group 1');
    assert.equal(flattenOptions(options)[1].value, 'bar');
    assert.equal(flattenOptions(options)[1].group, 'Group 2');
});
