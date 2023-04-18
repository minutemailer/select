function search(query, target) {
    let queryIdx = 0;
    let targetIdx = 0;

    while (queryIdx < query.length && targetIdx < target.length) {
        if (query[queryIdx].toLowerCase() === target[targetIdx].toLowerCase()) {
            queryIdx++;
        }
        targetIdx++;
    }

    return queryIdx === query.length;
}

export default function fuzzySearch(options, query) {
    return !query || !query.length
        ? options
        : options.filter((o) =>
              search(
                  query.toLowerCase(),
                  `${o.name} ${o.group || ''}`.trim().toLowerCase(),
              ),
          );
}
