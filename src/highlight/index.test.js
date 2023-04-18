import { expect, test } from 'vitest';
import highlight from './index.js';

const options = [
    { value: 's', name: 'Small' },
    { value: 'm', name: 'Medium' },
    { value: 'l', name: 'Large' },
];

test('Can highlight next option', () => {
    expect(highlight(0, 1, options)).toEqual(1);
});

test('Can highlight previous option', () => {
    expect(highlight(1, -1, options)).toEqual(0);
});

test('Can rotate to first option', () => {
    expect(highlight(2, 1, options)).toEqual(0);
});

test('Can rotate to last option', () => {
    expect(highlight(0, -1, options)).toEqual(2);
});

test('Can skip disabled options', () => {
    const disabledOptions = [
        { value: 's', name: 'Small' },
        { value: 'm', name: 'Medium', disabled: true },
        { value: 'l', name: 'Large' },
    ];

    expect(highlight(0, 1, disabledOptions)).toEqual(2);
});

test('Can skip disabled options when rotating', () => {
    const disabledOptions = [
        { value: 's', name: 'Small' },
        { value: 'm', name: 'Medium' },
        { value: 'l', name: 'Large', disabled: true },
    ];

    expect(highlight(1, 1, disabledOptions)).toEqual(0);
});

test('Can skip disabled options when rotating backwards', () => {
    const disabledOptions = [
        { value: 's', name: 'Small', disabled: true },
        { value: 'm', name: 'Medium' },
        { value: 'l', name: 'Large' },
    ];

    expect(highlight(1, -1, disabledOptions)).toEqual(2);
});

test('Return current index if all options are disabled', () => {
    const disabledOptions = [
        { value: 's', name: 'Small', disabled: true },
        { value: 'm', name: 'Medium', disabled: true },
        { value: 'l', name: 'Large', disabled: true },
    ];

    expect(highlight(1, -1, disabledOptions)).toEqual(1);
});
