import React, { Suspense } from "react";
import ListingDetails from "@/components/listings/ListingDetails";

export default function Page({ params }) {
  return (
    <div className="px-[162px] py-[70px]">
      <ListingDetails id={params.id} region={params.region} />
      {/* <ItemDetails id={params.id} region={params.region} /> */}
    </div>
  );
}
