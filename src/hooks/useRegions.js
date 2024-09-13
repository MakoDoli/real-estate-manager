import { getRegions } from "@/service/apiRegions";
import { useQuery } from "@tanstack/react-query";

export function useRegions() {
  const {
    data: regions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });
  return { regions, isLoading, error };
}
