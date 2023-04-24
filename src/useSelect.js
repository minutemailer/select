import { useContext } from 'react';
import SelectContext from './SelectContext';

export default function useSelect() {
    return useContext(SelectContext);
}
