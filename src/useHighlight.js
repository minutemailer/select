import { useCallback, useContext, useState } from 'react';
import SelectContext from './SelectContext';
import fuzzySearch from './fuzzySearch';
import highlight from './highlight';

export default function useHighlight(onEscape) {
    const { options, setValue, highlighted, setHighlighted } =
        useContext(SelectContext);
    const onKeyDown = useCallback(
        (e) => {
            const key = e.key.replace('Arrow', '').toLowerCase();

            if (key === 'down' || key === 'up') {
                e.preventDefault();

                setHighlighted(
                    highlight(highlighted, key === 'down' ? 1 : -1, options),
                );
            }
        },
        [highlighted, options],
    );

    const onKeyUp = useCallback(
        (e) => {
            if (e.key === 'Escape' && onEscape) {
                e.preventDefault();
                onEscape();
            } else if (e.key === 'Enter') {
                e.preventDefault();

                const selected = options[highlighted];

                if (selected) {
                    setValue(selected.value);
                }
            }
        },
        [setValue, onEscape, options, highlighted],
    );

    return {
        highlighted,
        onKeyDown,
        onKeyUp,
    };
}
