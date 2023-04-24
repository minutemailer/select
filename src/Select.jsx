import { useCallback, useEffect, useState } from 'react';
import SelectContext from './SelectContext';
import flattenOptions from './flattenOptions';

export default function Select({
    value: defaultValue,
    options: defaultOptions,
    onChange,
    children,
    ...props
}) {
    const [options, setOptions] = useState([]);
    const [defaultFlatOptions, setDefaultFlatOptions] = useState([]);
    const [value, setValue] = useState(defaultValue);
    const [highlighted, setHighlighted] = useState(0);
    const onSetValue = useCallback(
        (newValue, option) => {
            setValue(newValue);
            onChange(newValue, option);
        },
        [onChange],
    );

    useEffect(() => {
        const flattenedOptions = flattenOptions(defaultOptions);

        setOptions(flattenedOptions);
        setDefaultFlatOptions(flattenedOptions);
    }, [defaultOptions]);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <SelectContext.Provider
            value={{
                value,
                defaultOptions,
                defaultFlatOptions,
                options,
                setOptions,
                setValue: onSetValue,
                highlighted,
                setHighlighted,
                ...props,
            }}
        >
            {children}
        </SelectContext.Provider>
    );
}
