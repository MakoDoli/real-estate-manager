"use client";
import React from "react";
import Carousel from "./Carousel";
import { useListings } from "@/hooks/useListings";
import MinisSpinner from "../ui/MiniSpinner";
import ListingCard from "../listings/ListingCard";

export default function CarouselContainer() {
  const { listings, isLoading } = useListings();
  if (isLoading) return <MinisSpinner />;
  return <Carousel items={listings}></Carousel>;
}
