import React, { Suspense } from "react";
import ListingDetails from "@/components/listings/ListingDetails";
import CarouselContainer from "../../../../components/carousel/CarouselContainer";

export default function Page({ params }) {
  return (
    <div className="px-[162px] py-[70px]">
      <ListingDetails id={params.id} region={params.region} />
      {/* <ItemDetails id={params.id} region={params.region} /> */}
      {/* <Carousel visibleItemsCount={4} withIndicator isInfinite>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i, k) => (
          <div key={k}>{i}</div>
        ))}
      </Carousel> */}
      {/* <CarouselContainer /> */}
    </div>
  );
}
