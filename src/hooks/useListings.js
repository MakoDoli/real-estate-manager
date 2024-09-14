import { getListings } from "@/service/apiListings";
import { useQuery } from "@tanstack/react-query";

export function useListings() {
  const {
    data: listings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });
  return { listings, isLoading, error };
}
