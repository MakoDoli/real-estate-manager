import { useListings } from "@/hooks/useListings";
import MinisSpinner from "@/ui/MiniSpinner";
import ListingCard from "./ListingCard";

export default function Listings() {
  const { listings, isLoading } = useListings();

  if (isLoading) return <MinisSpinner />;
  return (
    <div className="flex flex-wrap gap-[20px] w-[1596px] mx-auto">
      {listings?.map((listing) => (
        <ListingCard item={listing} key={listing.id} />
      ))}
    </div>
  );
}
