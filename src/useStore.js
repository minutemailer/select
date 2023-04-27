import { useContext } from 'react';
import SelectContext from './SelectContext';

export default function useStore() {
    return useContext(SelectContext);
}
