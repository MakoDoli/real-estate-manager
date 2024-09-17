import { slimFont } from "@/app/fonts/fontWeight";
import React, { forwardRef, useState, useContext } from "react";
import { FilterContext } from "../../providers/FilterProvider";

const AreaRange = forwardRef(({ open, setOpen }, ref) => {
  const { filters, setFilters } = useContext(FilterContext);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const prices = [
    { min: 0, max: 50 },
    { min: 50, max: 100 },
    { min: 100, max: 150 },
    { min: 150, max: 200 },
    { min: 200, max: 300 },
  ];

  const handleOptionClick = (option) => {
    setMinValue(option.min);
    setMaxValue(option.max);
  };

  const handleFilter = () => {
    if (minValue !== "" && maxValue !== "") {
      const newRange = { min: minValue, max: maxValue };

      const updatedFilters = filters.filter((f) => f.type !== "area"); //
      updatedFilters.push({ type: "area", value: newRange });
      setFilters(updatedFilters);
    }
    setOpen();
  };

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={`flex flex-col w-[382px] h-[372px] bg-white absolute z-40 rounded-[10px] mt-4 border border-gray-300 p-6`}
    >
      <h1 className="text-iconGray text-[16px] mb-6">ფართობის მიხედვით</h1>
      <div className="flex gap-[15px] relative  mb-6 h-[42px] ">
        <label>
          <input
            type="text"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            placeholder="დან"
            className={`${slimFont.className} w-[155px] h-[42px] text-[14px] border border-gray-400 outline-none rounded-[6px] pl-[10px]`}
          />
          <p
            className={`${slimFont.className} absolute text-deleteListing text-[12px] top-[13px] left-[132px]`}
          >
            მ<sup>2</sup>
          </p>
          <p
            className={`${slimFont.className} absolute text-deleteListing text-[12px] top-[13px] left-[302px]`}
          >
            მ<sup>2</sup>
          </p>
        </label>
        <label>
          <input
            type="text"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            placeholder="მდე"
            className={`${slimFont.className} w-[155px] h-[42px] text-[14px] border border-gray-400 outline-none rounded-[6px] pl-[10px]`}
          />
        </label>
      </div>

      <ul className="mb-6">
        <div className="text-iconGray gap-[140px] mb-4 text-[14px] flex">
          <p>
            მინ.მ<sup>2</sup>
          </p>
          <p>
            მაქს.მ<sup>2</sup>
          </p>
        </div>
        {prices.map((price, index) => (
          <li
            className={`${slimFont.className} text-[14px] flex gap-[80px] mb-2 text-deleteListing cursor-pointer`}
            key={index}
            onClick={() => handleOptionClick(price)}
          >
            <p className="w-[100px]">
              {price.min} მ<sup>2</sup>
            </p>
            <p>
              {price.max} მ<sup>2</sup>
            </p>
          </li>
        ))}
      </ul>

      <div
        className="w-[77px] h-[33px] rounded-[8px] bg-buttonOrange flex justify-center items-center cursor-pointer text-white text-[14px] self-end"
        onClick={handleFilter}
      >
        არჩევა
      </div>
    </div>
  );
});

AreaRange.displayName = "AreaRange";
export default AreaRange;
