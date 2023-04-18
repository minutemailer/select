import { useCallback, useEffect, useMemo, useState } from 'react';
import fuzzySearch from './fuzzySearch';
import flattenOptions from './flattenOptions';
import groupOptions from './groupOptions';
import highlight from './highlight';

export function useSelect(value, options, onChange, onEscape) {
    const [flatOptions, setFlatOptions] = useState([]);
    const [q, setQ] = useState('');
    const [highlighted, setHighlighted] = useState(0);
    const onKeyDown = useCallback(
        (e) => {
            const key = e.key.replace('Arrow', '').toLowerCase();

            if (key === 'down' || key === 'up') {
                e.preventDefault();
                setHighlighted(
                    highlight(
                        highlighted,
                        key === 'down' ? 1 : -1,
                        flatOptions,
                    ),
                );
            }
        },
        [highlighted, flatOptions],
    );
    const onKeyUp = useCallback(
        (e) => {
            if (e.key === 'Escape' && onEscape) {
                e.preventDefault();
                onEscape();
            } else if (e.key === 'Enter' && onChange) {
                e.preventDefault();

                const selected = flatOptions[highlighted];

                if (selected) {
                    onChange(selected.value, selected);
                }
            }
        },
        [onChange, onEscape, flatOptions, highlighted],
    );

    const groupedOptions = useMemo(
        () => groupOptions(flatOptions),
        [flatOptions],
    );

    useEffect(() => {
        setFlatOptions(fuzzySearch(flattenOptions(options), q));
    }, [options, q]);

    const snapshot = useMemo(
        () => ({
            value,
            q,
            highlighted,
        }),
        [q, highlighted, value],
    );

    return {
        options: groupedOptions,
        snapshot,
        onSearch: setQ,
        onKeyDown,
        onKeyUp,
    };
}
