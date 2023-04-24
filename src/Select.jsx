import SelectContext from './SelectContext';
import { useCallback, useEffect, useState } from 'react';
import flattenOptions from './flattenOptions';

export default function Select({
    value: defaultValue,
    options: defaultOptions,
    onChange,
    children,
}) {
    const [options, setOptions] = useState([]);
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
        setOptions(flattenOptions(defaultOptions));
    }, [defaultOptions]);

    useEffect(() => {
        console.log(defaultValue);
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <SelectContext.Provider
            value={{
                value,
                defaultOptions,
                options,
                setOptions,
                setValue: onSetValue,
                highlighted,
                setHighlighted,
            }}
        >
            {children}
        </SelectContext.Provider>
    );
}
