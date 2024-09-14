"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getListingById } from "../service/apiListings";
import { useParams } from "next/navigation";

export default function useListingDetails() {
  const { id } = useParams();
  const idInt = parseInt(id);

  const {
    data: listingDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["listingDetails", idInt],

    queryFn: () => getListingById(idInt),
  });
  return { listingDetails, isLoading, error };
}
