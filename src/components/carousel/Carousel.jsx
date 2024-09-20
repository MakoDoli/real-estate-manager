/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import ListingCard from "../listings/ListingCard";

const Carousel = ({ items }) => {
  const [startIndex, setStartIndex] = useState(0);

  const [list, setList] = useState([]);
  const itemCount = list.length;
  console.log(startIndex);
  useEffect(() => {
    const arrClone = [...items];
    if (startIndex === 0) setList(items);
    if (startIndex === itemCount - 4) setList([...list, ...arrClone]);
  }, [startIndex, list]);
  console.log(list);
  const moveLeft = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + itemCount) % itemCount);
  };

  const moveRight = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % itemCount);
  };
  if (items.length < 1) return <h1> მსგავს ლოკაციაზე ბინები ვერ მოიძებნა</h1>;
  return (
    <div className="relative w-[1596px] mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-1000 "
          style={{
            transform: `translateX(calc(-${startIndex * (100 / 4)}% - ${
              startIndex * 5
            }px ) )`,
            gap: "20px",
          }}
        >
          {list.map((item, index) => (
            <div key={index} style={{ flexBasis: "calc(25% - 15px)" }}>
              <ListingCard item={item} />
            </div>
          ))}
        </div>
      </div>
      {list.length >= 4 && (
        <button
          onClick={moveRight}
          className="absolute -left-[40px] top-1/2 transform -translate-y-1/2 hover:bg-gray-50 rounded-sm focus:outline-none"
        >
          <img src="/icons/back.png" alt="Left Arrow" className="w-6 h-6" />
        </button>
      )}
      {items.length >= 4 && startIndex > 0 && (
        <button
          onClick={moveLeft}
          className="absolute -right-[40px] top-1/2 transform -translate-y-1/2 hover:bg-gray-50 rounded-sm focus:outline-none"
        >
          <img
            src="/icons/rightarrow.png"
            alt="Right Arrow"
            className="w-6 h-6"
          />
        </button>
      )}
    </div>
  );
};

export default Carousel;
