import { useListings } from "@/hooks/useListings";

import ListingCard from "./ListingCard";
import Spinner from "../ui/Spinner";

export default function Listings() {
  const { listings, isLoading } = useListings();

  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-wrap gap-[20px] w-[1596px] mx-auto">
      {listings?.map((listing) => (
        <ListingCard item={listing} key={listing.id} />
      ))}
    </div>
  );
}
