import useStore from './useStore';

export default function useSelector(selector) {
    const { useSelector } = useStore();

    return useSelector(selector);
}
