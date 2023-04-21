import { useContext, useMemo } from 'react';
import SelectContext from './SelectContext';
import groupOptions from './groupOptions';

export default function useOptions() {
    const { options } = useContext(SelectContext);

    return useMemo(() => groupOptions(options), [options]);
}
