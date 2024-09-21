import { createNewAgent } from "@/service/apiAgents";
import { useMutation } from "@tanstack/react-query";

export function useAddAgent() {
  //const queryClient = useQueryClient();
  const { mutate: addNewAgent, isPending } = useMutation({
    mutationFn: createNewAgent,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["agents"]);
    // },
  });

  return { addNewAgent, isPending };
}
