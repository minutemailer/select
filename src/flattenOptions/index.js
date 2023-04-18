export default function flattenOptions(options) {
    const flatOptions = [];

    options.forEach((option) => {
        if (option.type === 'group') {
            option.items.forEach((item) => {
                flatOptions.push({ ...item, group: option.name });
            });
        } else {
            flatOptions.push(option);
        }
    });

    return flatOptions;
}
