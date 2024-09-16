import { deleteListingById } from "@/service/apiListings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteListing() {
  const queryClient = useQueryClient();
  const {
    mutate: removeListing,

    isLoading: isRemovingListing,
  } = useMutation({
    mutationFn: (id) => deleteListingById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });
  return { removeListing, isRemovingListing };
}
