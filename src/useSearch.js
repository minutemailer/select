import { useCallback, useContext, useState } from 'react';
import SelectContext from './SelectContext';
import fuzzySearch from './fuzzySearch';
import flattenOptions from './flattenOptions';

export default function useSearch(defaultQuery = '') {
    const [q, setQ] = useState(defaultQuery);
    const { defaultOptions, setOptions } = useContext(SelectContext);
    const onSearch = useCallback(
        (str) => {
            setQ(str);
            setOptions(fuzzySearch(flattenOptions(defaultOptions), str));
        },
        [defaultOptions],
    );

    return {
        q,
        onSearch,
    };
}
