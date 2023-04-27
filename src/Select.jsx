import { useEffect, useMemo } from 'react';
import SelectContext from './SelectContext';
import flattenOptions from './flattenOptions';
import createStore from './createStore';
import { initialState, reducer } from './store';
import groupOptions from './groupOptions';

export default function Select({
    value: defaultValue,
    options: defaultOptions,
    onChange,
    children,
}) {
    const store = useMemo(() => {
        const flattenedOptions = flattenOptions(defaultOptions);

        return createStore(
            {
                ...initialState,
                options: groupOptions(flattenedOptions),
                flatOptions: flattenedOptions,
                defaultFlatOptions: flattenedOptions,
                value: defaultValue,
                onChange,
            },
            reducer,
        );
    }, []);

    useEffect(() => {
        store.dispatch({
            type: 'SET_VALUE',
            value: defaultValue,
            silent: true,
        });
    }, [defaultValue]);

    useEffect(() => {
        store.dispatch({ type: 'SET_OPTIONS', value: defaultOptions });
    }, [defaultOptions]);

    return (
        <SelectContext.Provider value={store}>
            {children}
        </SelectContext.Provider>
    );
}
