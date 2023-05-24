export const handleQueryingUrl = (filters) => {
    const keys = Object.keys(filters);
    let query = "";
    keys.forEach((key, idx) => {
      const handleAnd = query.length === 0 ? "" : "&";
      if (key.includes("min")) {
        const queryKey = key.slice(3).toLocaleLowerCase();
        query += `${handleAnd}filter[${queryKey}][gte]=${filters[key]}`;
        // filter[cost][gte]=value
      } else if (key.includes("max")) {
        const queryKey = key.slice(3).toLocaleLowerCase();
        query += `${handleAnd}filter[${queryKey}][lte]=${filters[key]}`;
      } else {
        query += `${handleAnd}filter[${key}]=${filters[key]}`;
      }
    });
    return query;
  };