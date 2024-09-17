export const filterListings = (filters, listings) => {
  return listings.filter((listing) => {
    return filters.some((filter) => {
      if (filter.type in listing) {
        const listingValue = listing[filter.type];
        if (
          typeof filter.value === "object" &&
          filter.value.min !== undefined &&
          filter.value.max !== undefined
        ) {
          return (
            listingValue >= filter.value.min && listingValue <= filter.value.max
          );
        } else {
          if (filter.type === "city") {
            return listingValue.region.name === filter.value;
          } else {
            return listingValue === filter.value;
          }
        }
      }
      return false;
    });
  });
};
