import { useCallback, useEffect, useMemo, useState } from 'react';
import fuzzySearch from './fuzzySearch';
import flattenOptions from './flattenOptions';
import groupOptions from './groupOptions';
import highlight from './highlight';

export function useSelect(value, options, onChange, onEscape) {
    const [flatOptions, setFlatOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [q, setQ] = useState('');
    const [highlighted, setHighlighted] = useState(0);
    const [option, setOption] = useState(null);
    const onKeyDown = useCallback(
        (e) => {
            const key = e.key.replace('Arrow', '').toLowerCase();

            if (key === 'down' || key === 'up') {
                e.preventDefault();
                setHighlighted(
                    highlight(
                        highlighted,
                        key === 'down' ? 1 : -1,
                        filteredOptions,
                    ),
                );
            }
        },
        [highlighted, filteredOptions],
    );

    const onKeyUp = useCallback(
        (e) => {
            if (e.key === 'Escape' && onEscape) {
                e.preventDefault();
                onEscape();
            } else if (e.key === 'Enter' && onChange) {
                e.preventDefault();

                const selected = filteredOptions[highlighted];

                if (selected) {
                    onChange(selected.value, selected);
                    setQ('');
                }
            }
        },
        [onChange, onEscape, filteredOptions, highlighted],
    );

    useEffect(() => {
        setFlatOptions(flattenOptions(options));
    }, [options]);

    useEffect(() => {
        setFilteredOptions(fuzzySearch(flatOptions, q));
    }, [flatOptions, q]);

    useEffect(() => {
        setOption(flatOptions.find((o) => o.value === value));
    }, [value, flatOptions]);

    const snapshot = useMemo(
        () => ({
            highlighted,
            options: groupOptions(filteredOptions),
            option,
        }),
        [highlighted, filteredOptions, option],
    );

    return {
        snapshot,
        onSearch: setQ,
        onKeyDown,
        onKeyUp,
    };
}
