import { useCallback } from 'react';
import useStore from './useStore';

export default function useKeyboard(onEscape) {
    const { dispatch } = useStore();
    const onKeyDown = useCallback(
        (e) => {
            const key = e.key.replace('Arrow', '').toLowerCase();

            if (key === 'down' || key === 'up') {
                e.preventDefault();
                dispatch({ type: 'HIGHLIGHT', value: key });
            }
        },
        [dispatch],
    );

    const onKeyUp = useCallback(
        (e) => {
            if (e.key === 'Escape' && onEscape) {
                e.preventDefault();
                onEscape();
            } else if (e.key === 'Enter') {
                e.preventDefault();

                dispatch({ type: 'SELECT_HIGHLIGHTED' });
            }
        },
        [onEscape],
    );

    return {
        onKeyDown,
        onKeyUp,
    };
}
