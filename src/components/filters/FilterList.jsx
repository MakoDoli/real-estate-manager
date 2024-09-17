import React from "react";
import { useFilters } from "../../providers/FilterProvider";
import { slimFont } from "@/app/fonts/fontWeight";
import Image from "next/image";

function FilterList() {
  const { filters, setFilters } = useFilters();

  const removeFilter = (filterToRemove) => {
    setFilters(filters.filter((filter) => filter !== filterToRemove));
  };

  return (
    <div className=" top-16 flex gap-2 items-center z-20 absolute h-[29px]">
      {filters.map((filter, index) =>
        filter.type === "price" || filter.type === "area" ? (
          <div
            key={index}
            className={`${slimFont.className} rounded-full flex items-center gap-1 text-iconGray text-[14px] h-[29px] px-[10px] opacity-80 border border-gray-300 `}
          >
            <p>
              {filter.value.min || "0"}
              {filter.value.min !== "" && (filter.type === "price" ? "₾" : "მ")}
              {filter.value.min !== "" && filter.type === "area" && (
                <sup>2</sup>
              )}
            </p>
            <p>-</p>
            <p>
              {filter.value.max || "დან"}
              {filter.value.max !== "" && (filter.type === "price" ? "₾" : "მ")}
              {filter.value.max !== "" && filter.type === "area" && (
                <sup>2</sup>
              )}
            </p>
            <Image
              src="/icons/clear.png"
              alt="clear"
              width={14}
              height={14}
              className="mr-[10px] cursor-pointer"
              onClick={() => removeFilter(filter)}
            />
          </div>
        ) : (
          <div
            key={index}
            className={`${slimFont.className} rounded-full flex items-center gap-1 text-iconGray text-[14px] h-[29px] px-[10px] opacity-80 border border-gray-300 `}
          >
            <p>{filter.value}</p>
            <Image
              src="/icons/clear.png"
              alt="clear"
              width={14}
              height={14}
              className="cursor-pointer"
              onClick={() => removeFilter(filter)}
            />
          </div>
        )
      )}
      {filters.length > 0 && (
        <div
          className="text-[14px] ml-4 cursor-pointer"
          onClick={() => setFilters([])}
        >
          გასუფთავება
        </div>
      )}
    </div>
  );
}

export default FilterList;
