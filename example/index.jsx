import { createRoot } from 'react-dom/client';

import '@minutemailer/facade/styles/theme.scss';
import '@minutemailer/facade/styles/foundation.css';
import Button from '@minutemailer/facade/components/Button';
import Stack from '@minutemailer/facade/components/Stack';
import { useSelect } from '../src';
import { useMemo, useState } from 'react';
import Input from '@minutemailer/facade/components/Input';
import Box from '@minutemailer/facade/components/Box';

function App() {
    const [value, setValue] = useState('foo');
    const sizes = useMemo(
        () => [
            { value: 's', name: 'Small' },
            { value: 'm', name: 'Medium' },
            { value: 'l', name: 'Large' },
        ],
        [],
    );
    const { snapshot, options, onSearch, onKeyDown, onKeyUp } = useSelect(
        value,
        sizes,
        setValue,
    );

    return (
        <Stack
            align="center"
            direction="vertical"
            valign="middle"
            height="screen"
            gap
        >
            <Box width={2}>
                <Input
                    id="selectSearch"
                    placeholder="Find size"
                    value={snapshot.q}
                    onChange={onSearch}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    marginBottom="xs"
                />
                <Stack direction="vertical" gap="xxs" expand width={100}>
                    {options.map((option, i) => (
                        <Button
                            key={option.value}
                            onClick={() => setValue(option.value)}
                            variant={
                                i === snapshot.highlighted ||
                                snapshot.value === option.value
                                    ? 'outline-color'
                                    : 'outline'
                            }
                            color={
                                snapshot.value === option.value &&
                                i !== snapshot.highlighted
                                    ? 'primary'
                                    : 'secondary'
                            }
                        >
                            {option.name}
                        </Button>
                    ))}
                </Stack>
            </Box>
        </Stack>
    );
}

const root = createRoot(document.getElementById('app'));

root.render(<App />);
