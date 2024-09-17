import { slimFont } from "@/app/fonts/fontWeight";
import React, { forwardRef, useState, useContext } from "react";
import { FilterContext } from "../../providers/FilterProvider";

const PriceRange = forwardRef(({ open, setOpen }, ref) => {
  const { filters, setFilters } = useContext(FilterContext);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [showError, setShowError] = useState(false);

  const prices = [
    { min: 0, max: 100000 },
    { min: 10000, max: 150000 },
    { min: 150000, max: 200000 },
    { min: 200000, max: 250000 },
    { min: 250000, max: 300000 },
  ];

  const handleOptionClick = (option) => {
    setMinValue(option.min);
    setMaxValue(option.max);
  };

  const handleFilter = () => {
    if (
      minValue !== "" &&
      maxValue !== "" &&
      parseFloat(minValue) > parseFloat(maxValue)
    ) {
      setShowError(true);
      return;
    }
    setShowError(false);
    if (minValue !== "" || maxValue !== "") {
      const newRange = { min: minValue, max: maxValue };

      const updatedFilters = filters.filter((f) => f.type !== "price"); //
      updatedFilters.push({ type: "price", value: newRange });
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
      <h1 className="text-iconGray text-[16px] mb-6">ფასის მიხედვით</h1>
      <div className="flex gap-[15px] relative  mb-6 h-[42px] ">
        <label>
          <input
            type="text"
            value={minValue}
            onChange={(e) => {
              setMinValue(e.target.value);
            }}
            placeholder="დან"
            className={`${slimFont.className} w-[155px] h-[42px] text-[14px] border border-gray-400 outline-none rounded-[6px] pl-[10px]`}
          />
          <p
            className={`${slimFont.className} absolute text-deleteListing text-[12px] top-[13px] left-[132px]`}
          >
            ₾
          </p>
          <p
            className={`${slimFont.className} absolute text-deleteListing text-[12px] top-[13px] left-[302px]`}
          >
            ₾
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
        {showError && (
          <p
            className={`${slimFont.className} text-red-500 text-[12px] absolute -top-5`}
          >
            შეიყვანეთ ვალიდური რიცხვები
          </p>
        )}
      </div>

      <ul className="mb-6">
        <div className="text-iconGray gap-[120px] mb-4 text-[14px] flex">
          <p>მინ.ფასი</p>
          <p>მაქს.ფასი</p>
        </div>
        {prices.map((price, index) => (
          <li
            className={`${slimFont.className} text-[14px] flex gap-[80px] mb-2 text-deleteListing cursor-pointer`}
            key={index}
            onClick={() => handleOptionClick(price)}
          >
            <p className="w-[100px]">{price.min} ₾</p>
            <p>{price.max} ₾</p>
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

PriceRange.displayName = "PriceRange";
export default PriceRange;
