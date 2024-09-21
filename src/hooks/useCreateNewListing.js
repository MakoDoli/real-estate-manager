import { createNewListing } from "@/service/apiListings";
import { useMutation } from "@tanstack/react-query";

export function useCreateNewListing() {
  //const queryClient = useQueryClient();
  const { mutate: createListing, isPending } = useMutation({
    mutationFn: createNewListing,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["listings"]);
    // },
  });

  return { createListing, isPending };
}
