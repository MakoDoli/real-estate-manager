import { getAgents } from "@/service/apiAgents";

import { useQuery } from "@tanstack/react-query";

export function useAgents() {
  const {
    data: agents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });
  return { agents, isLoading, error };
}
