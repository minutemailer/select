import flattenOptions from './flattenOptions';
import isValidValue from './isValidValue';
import highlight from './highlight';
import groupOptions from './groupOptions';
import fuzzySearch from './fuzzySearch';

export const initialState = {
    value: null,
    option: null,
    options: [],
    flatOptions: [],
    defaultFlatOptions: [],
    highlighted: 0,
    q: '',
};

export function reducer(state, action) {
    if (action.type === 'SET_OPTIONS') {
        const flattenedOptions = flattenOptions(action.value);

        return {
            ...state,
            options: groupOptions(flattenedOptions),
            flatOptions: flattenedOptions,
            defaultFlatOptions: flattenedOptions,
        };
    }

    if (action.type === 'SET_VALUE') {
        const update = { value: action.value, q: '' };

        if (isValidValue(update.value) && state.flatOptions.length) {
            update.option = state.flatOptions.find(
                (option) => option.value === update.value,
            );

            if (update.option) {
                update.highlighted = update.option.index;
            }
        } else {
            update.option = null;
            update.highlighted = 0;
        }

        if (state.onChange && !action.silent) {
            state.onChange(update.value, update.option);
        }

        return {
            ...state,
            ...update,
        };
    }

    if (action.type === 'SET_ON_CHANGE') {
        return {
            ...state,
            onChange: action.value,
        };
    }

    if (action.type === 'SET_HIGHLIGHTED') {
        return {
            ...state,
            highlighted: action.value,
        };
    }

    if (action.type === 'HIGHLIGHT') {
        return {
            ...state,
            highlighted: highlight(
                state.highlighted,
                action.value === 'down' ? 1 : -1,
                state.flatOptions,
            ),
        };
    }

    if (action.type === 'SELECT_HIGHLIGHTED') {
        const option = state.flatOptions[state.highlighted];
        const value = option ? option.value : null;

        if (state.onChange && !action.silent) {
            state.onChange(value, option);
        }

        return {
            ...state,
            value,
            option,
        };
    }

    if (action.type === 'FILTER') {
        const filteredOptions = fuzzySearch(
            state.defaultFlatOptions,
            action.value,
        );

        return {
            ...state,
            q: action.value,
            options: groupOptions(filteredOptions),
            flatOptions: filteredOptions,
            highlighted: 0,
        };
    }

    if (action.type === 'CLEAR_FILTER') {
        return {
            ...state,
            q: '',
            options: groupOptions(state.defaultFlatOptions),
            flatOptions: state.defaultFlatOptions,
            highlighted: 0,
        };
    }

    return state;
}
