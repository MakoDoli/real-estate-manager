export const filterListings = (filters, listings) => {
  return listings.filter((listing) => {
    // Check if the listing matches at least one filter
    return filters.some((filter) => {
      // Check if the listing property exists and matches the filter
      if (filter.type in listing) {
        const listingValue = listing[filter.type];
        if (
          typeof filter.value === "object" &&
          filter.value.min !== undefined &&
          filter.value.max !== undefined
        ) {
          // If the filter value is an object with min and max
          return (
            listingValue >= filter.value.min && listingValue <= filter.value.max
          );
        } else {
          if (filter.type === "city") {
            console.log(listingValue);
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
