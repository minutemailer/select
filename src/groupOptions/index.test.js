import { expect, test } from 'vitest';
import groupOptions from './index.js';
import flattenOptions from '../flattenOptions';

test('Can group options', () => {
    const options = [
        { value: 'foo', name: 'foo' },
        {
            type: 'group',
            name: 'Group 1',
            items: [
                { value: 'foo', name: 'foo' },
                { value: 'baz', name: 'baz' },
            ],
        },
        {
            type: 'group',
            name: 'Group 2',
            items: [{ value: 'bar', name: 'bar' }],
        },
    ];

    const flatOptions = flattenOptions(options);
    const groupedOptions = groupOptions(flatOptions);

    expect(groupedOptions).toEqual(options);
});
