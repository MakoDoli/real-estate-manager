import { slimFont } from "@/app/fonts/fontWeight";
import React, { forwardRef, useState, useContext } from "react";
import { FilterContext } from "../../providers/FilterProvider";

const BedroomCount = forwardRef(({ open, setOpen }, ref) => {
  const { filters, setFilters } = useContext(FilterContext);
  const [newValue, setNewValue] = useState("");
  const [showError, setShowError] = useState(false);

  const handleFilter = () => {
    const updatedFilters = filters.filter((f) => f.type !== "bedrooms"); //
    updatedFilters.push({ type: "bedrooms", value: newValue });
    setFilters(updatedFilters);

    setOpen();
  };

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={`flex flex-col w-[282px] h-[198px] bg-white absolute z-40 rounded-[10px] mt-4 border border-gray-300 p-6`}
    >
      <h1 className="text-iconGray text-[16px] mb-6">საძინებლების რაოდენობა</h1>
      <div className="flex gap-[15px] relative  mb-6 h-[42px] ">
        <label>
          {showError && (
            <p
              className={`${slimFont.className} text-red-500 text-[12px] absolute top-12`}
            >
              მხოლოდ ციფრი
            </p>
          )}
          <input
            type="text"
            value={newValue}
            onChange={(e) => {
              if (isNaN(e.target.value) || e.target.value.length > 1) {
                setShowError(true);
              } else {
                setShowError(false);
                setNewValue(Number(e.target.value));
              }
            }}
            className={`${slimFont.className} w-[41px] h-[42px] text-[14px] border border-gray-400 outline-none rounded-[6px] pl-[10px] flex    justify-center items-center`}
          />
        </label>
      </div>

      <div
        className="w-[77px] h-[33px] rounded-[8px] bg-buttonOrange flex justify-center items-center cursor-pointer text-white text-[14px] self-end"
        onClick={handleFilter}
      >
        არჩევა
      </div>
    </div>
  );
});

BedroomCount.displayName = "BedroomCount";
export default BedroomCount;
