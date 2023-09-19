import { useCallback } from 'react';
import useSelector from './useSelector';
import useStore from './useStore';

export default function useSearch() {
    const q = useSelector((state) => state.q);
    const { dispatch } = useStore();
    const search = useCallback(
        (str) => dispatch({ type: 'FILTER', value: str }),
        [],
    );
    const clear = useCallback(() => dispatch({ type: 'CLEAR_FILTER' }), []);

    return {
        q,
        search,
        clear,
    };
}
