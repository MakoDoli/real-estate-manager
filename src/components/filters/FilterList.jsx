import React from "react";
import { useFilters } from "../../providers/FilterProvider";
import { slimFont } from "@/app/fonts/fontWeight";
import Image from "next/image";

function FilterList() {
  const { filters } = useFilters();

  return (
    <div className=" top-16 flex gap-2 items-center z-20 absolute h-[29px]">
      {filters.map((filter, index) =>
        filter.type === "price" || filter.type === "area" ? (
          <div
            key={index}
            className={`${slimFont.className} rounded-full flex items-center gap-1 text-iconGray text-[14px] h-[29px] px-[10px] opacity-80 border border-gray-300 `}
          >
            <p>
              {filter.value.min}
              {filter.type === "price" ? "₾" : "მ"}
              {filter.type === "area" && <sup>2</sup>}
            </p>
            <p>-</p>
            <p>
              {filter.value.max}
              {filter.type === "price" ? "₾" : "მ"}
              {filter.type === "area" && <sup>2</sup>}
            </p>
            <Image
              src="/icons/clear.png"
              alt="clear"
              width={14}
              height={14}
              className="mr-[10px]"
            />
          </div>
        ) : (
          <div
            key={index}
            className={`${slimFont.className} rounded-full flex items-center gap-1 text-iconGray text-[14px] h-[29px] px-[10px] opacity-80 border border-gray-300 `}
          >
            <p>{filter.value}</p>
            <Image src="/icons/clear.png" alt="clear" width={14} height={14} />
          </div>
        )
      )}
    </div>
  );
}

export default FilterList;
