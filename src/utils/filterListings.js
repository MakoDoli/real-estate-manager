export const filterListings = (filters, listings) => {
  return listings.filter((listing) => {
    return filters.some((filter) => {
      if (filter.type in listing) {
        const listingValue = listing[filter.type];
        if (typeof filter.value === "object") {
          const { min = "", max = "" } = filter.value;

          if (min === "" && max !== "") {
            return listingValue <= max;
          } else if (min !== "" && max === "") {
            return listingValue >= min;
          } else if (min === "" && max === "") {
            return true;
          } else {
            return listingValue >= min && listingValue < max;
          }
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
