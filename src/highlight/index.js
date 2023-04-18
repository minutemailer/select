export default function highlight(index, direction, options) {
    const { length } = options;
    let nextIndex = index + direction;

    if (nextIndex < 0) {
        nextIndex = length - 1;
    } else if (nextIndex >= length) {
        nextIndex = 0;
    }

    const nextHighlighted = options[nextIndex];

    if (nextHighlighted.disabled) {
        if (options.some((o) => !o.disabled)) {
            return highlight(nextIndex, direction, options);
        }

        return index;
    }

    return nextIndex;
}
