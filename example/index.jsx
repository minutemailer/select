import { createRoot } from 'react-dom/client';

import '@minutemailer/facade/styles/theme.scss';
import '@minutemailer/facade/styles/foundation.css';
import Button from '@minutemailer/facade/components/Button';
import Stack from '@minutemailer/facade/components/Stack';
import { useOptions, Select, useOption, useSearch, useKeyboard } from '../src';
import { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@minutemailer/facade/components/Box';
import Input from '@minutemailer/facade/components/Input';
import countries from './data.json';
import useSelector from '../src/useSelector';

function Option({ option }) {
    const { onMouseDown, isSelected, isHighlighted } = useOption(option);
    const ref = useRef();

    useEffect(() => {
        if (ref.current && (isHighlighted || isSelected)) {
            ref.current.scrollIntoView({
                block: 'center',
            });
        }
    }, [ref, isHighlighted, isSelected]);

    return (
        <Button
            onMouseDown={onMouseDown}
            tabIndex={-1}
            color={isSelected ? 'primary' : 'secondary'}
            ref={ref}
        >
            {isHighlighted && '👉'}
            {option.name}
        </Button>
    );
}

function Options() {
    const options = useSelector((state) => state.options);

    return (
        <Stack
            gap="xxs"
            direction="vertical"
            style={{ height: '160px', overflow: 'auto' }}
        >
            {options.map((option) => (
                <Option key={option.value} option={option} />
            ))}
        </Stack>
    );
}

function Search() {
    const { q, search } = useSearch();
    const { onKeyUp, onKeyDown } = useKeyboard();

    return (
        <Input
            id="search"
            placeholder="Search"
            marginBottom="xxs"
            value={q}
            onChange={search}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
        />
    );
}

function SelectBox() {
    const [value, setValue] = useState('SE');
    const onChange = useCallback((newValue, option) => {
        setValue(newValue);
        console.log(option);
    }, []);

    return (
        <>
            <Select options={countries} value={value} onChange={onChange}>
                <Search />
                <Options />
            </Select>
            <Button marginTop variant="outline" onClick={() => setValue('')}>
                Reset value
            </Button>
        </>
    );
}

function App() {
    return (
        <Stack
            align="center"
            direction="vertical"
            valign="middle"
            height="screen"
            gap
        >
            <Box width={2}>
                <SelectBox />
            </Box>
        </Stack>
    );
}

const root = createRoot(document.getElementById('app'));

root.render(<App />);
