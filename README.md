# Headless select box for React

A powerful, headless select box component for React that allows you to build your own select box UI.

## Installation
    
```bash
npm i @minutemailer/select
```

## Usage

```jsx
import { useState } from 'react';
import { Select } from '@minutemailer/select';

const options = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'Three' },
];

function SelectBox() {
    const options = useOptions();
    const { q, onSearch } = useSearch();
    const { onKeyUp, onKeyDown } = useHighlight();
    
    return ...;
}

function App() {
    const [value, setValue] = useState('1');
    
    return (
        <Select options={options} value={value}><SelectBox /></Select>
    );
};
```
