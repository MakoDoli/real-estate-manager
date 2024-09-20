"use client";
import React from "react";
import Carousel from "./Carousel";
import { useListings } from "@/hooks/useListings";
import MinisSpinner from "../ui/MiniSpinner";

export default function CarouselContainer({ region, listingId }) {
  const { listings, isLoading } = useListings();

  if (isLoading) return <MinisSpinner />;

  const regions = listings?.filter(
    (reg) => reg.city.region.id === region && reg.id !== Number(listingId)
  );
  return <Carousel items={regions}></Carousel>;
}
