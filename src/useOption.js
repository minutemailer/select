import useSelector from './useSelector';
import useStore from './useStore';

export default function useOption(option) {
    const { dispatch } = useStore();
    const { value, highlighted } = useSelector((state) => ({
        value: state.value,
        highlighted: state.highlighted,
    }));

    return {
        isSelected: value === option.value,
        isHighlighted: highlighted === option.index,
        onMouseDown: () => dispatch({ type: 'SET_VALUE', value: option.value }),
    };
}
