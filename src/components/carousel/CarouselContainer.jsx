"use client";
import React from "react";
import Carousel from "./Carousel";
import { useListings } from "@/hooks/useListings";
import MinisSpinner from "../ui/MiniSpinner";
import ListingCard from "../listings/ListingCard";

export default function CarouselContainer({ region }) {
  const { listings, isLoading } = useListings();
  console.log(region);
  if (isLoading) return <MinisSpinner />;
  const regions = listings?.filter((reg) => reg.city.region.id === region);
  return <Carousel items={regions}></Carousel>;
}
