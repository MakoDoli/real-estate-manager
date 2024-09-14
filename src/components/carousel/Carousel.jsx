/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import ListingCard from "../listings/ListingCard";

const Carousel = ({ items }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemCount = items.length;

  const moveLeft = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + itemCount) % itemCount);
  };

  const moveRight = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % itemCount);
  };

  const getItemAtIndex = (index) => {
    return items[index % itemCount];
  };

  const visibleItems = [
    getItemAtIndex(startIndex),
    getItemAtIndex(startIndex + 1),
    getItemAtIndex(startIndex + 2),
    getItemAtIndex(startIndex + 3),
  ];

  return (
    <div className="relative w-[1596px] mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ gap: "20px" }}
        >
          {visibleItems.map((item, index) => (
            <div key={index} style={{ flexBasis: "calc(25% - 15px)" }}>
              <ListingCard item={item} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={moveLeft}
        className="absolute -left-[40px] top-1/2 transform -translate-y-1/2 hover:bg-gray-50 rounded-sm focus:outline-none"
      >
        <img src="/icons/back.png" alt="Left Arrow" className="w-6 h-6" />
      </button>
      <button
        onClick={moveRight}
        className="absolute -right-[40px] top-1/2 transform -translate-y-1/2 hover:bg-gray-50 rounded-sm focus:outline-none"
      >
        <img
          src="/icons/rightarrow.png"
          alt="Right Arrow"
          className="w-6 h-6"
        />
      </button>
    </div>
  );
};

export default Carousel;
