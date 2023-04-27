import { useEffect, useState } from 'react';

export default function createStore(initialState, reducer) {
    const listeners = new Set();
    let state = initialState;
    const subscribe = (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    return {
        dispatch(action) {
            state = reducer(state, action);
            listeners.forEach((listener) => listener(state));
        },

        useSelector(selector) {
            const [selectedState, setSelectedState] = useState(() =>
                selector(state),
            );

            useEffect(() => {
                return subscribe(() => setSelectedState(selector(state)));
            }, []);

            return selectedState;
        },
    };
}
