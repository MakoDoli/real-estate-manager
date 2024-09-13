import { getCities } from "@/service/apiRegions";
import { useQuery } from "@tanstack/react-query";

export function useCities() {
  const {
    data: cities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });
  return { cities, isLoading, error };
}
