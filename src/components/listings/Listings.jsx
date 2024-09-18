import { useListings } from "@/hooks/useListings";

import ListingCard from "./ListingCard";
import Spinner from "../ui/Spinner";
import { filterListings } from "@/utils/filterListings";
import { useContext, useEffect, useState } from "react";
import { FilterContext } from "@/providers/FilterProvider";
import { slimFont } from "@/app/fonts/fontWeight";

export default function Listings() {
  const { listings, isLoading } = useListings();
  const { filters } = useContext(FilterContext);
  const [showListings, setShowListings] = useState([]);
  useEffect(() => {
    if (listings) {
      if (filters.length > 0) {
        const filtered = filterListings(filters, listings);
        console.log("Filtered Listings:", filtered);
        setShowListings(filtered);
      } else {
        setShowListings(listings);
      }
    }
  }, [filters, listings]);
  if (isLoading) return <Spinner />;
  if (showListings.length < 1)
    return (
      <h1
        className={`${slimFont.className} text-[20px] mt-[110px] text-iconGray`}
      >
        აღნიშნული მონაცამებით განცხადება არ იძებნება{" "}
      </h1>
    );
  return (
    <div className="flex flex-wrap gap-[20px] w-[1596px] mx-auto">
      {showListings?.map((listing) => (
        <ListingCard item={listing} key={listing.id} />
      ))}
    </div>
  );
}
