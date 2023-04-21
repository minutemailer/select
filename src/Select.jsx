import SelectContext from './SelectContext';
import { useEffect, useState } from 'react';
import flattenOptions from './flattenOptions';

export default function Select({
    value: defaultValue,
    options: defaultOptions,
    children,
}) {
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(defaultValue);
    const [highlighted, setHighlighted] = useState(0);

    useEffect(() => {
        setOptions(flattenOptions(defaultOptions));
    }, [defaultOptions]);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <SelectContext.Provider
            value={{
                value,
                defaultOptions,
                options,
                setOptions,
                setValue,
                highlighted,
                setHighlighted,
            }}
        >
            {children}
        </SelectContext.Provider>
    );
}
