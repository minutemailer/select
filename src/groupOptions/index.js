export default function groupOptions(flatOptions) {
    const groupedOptions = [];

    flatOptions.forEach((option) => {
        const { group: groupName, ...rest } = option;

        if (groupName) {
            const group = groupedOptions.find((g) => g.name === groupName);

            if (group) {
                group.items.push(rest);
            } else {
                groupedOptions.push({
                    type: 'group',
                    name: groupName,
                    items: [rest],
                });
            }
        } else {
            groupedOptions.push(rest);
        }
    });

    return groupedOptions;
}
