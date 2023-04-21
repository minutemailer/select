import { useContext, useMemo } from 'react';
import { SelectContext } from './index';

export default function useOption(option) {
    const { value, setValue, highlighted } = useContext(SelectContext);

    const props = useMemo(
        () => ({
            value: option.value,
            onMouseDown: () => setValue(option.value),
        }),
        [option],
    );

    return {
        isSelected: value === option.value,
        isHighlighted: highlighted === option.index,
        props,
    };
}
