import { createNewAgent } from "@/service/apiAgents";
import { createNewListing } from "@/service/apiListings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddAgent() {
  const queryClient = useQueryClient();
  const { mutate: addNewAgent, isPending } = useMutation({
    mutationFn: createNewAgent,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["listings"]);
    // },
  });

  return { addNewAgent, isPending };
}
