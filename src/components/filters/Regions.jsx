import { slimFont } from "@/app/fonts/fontWeight";
import { useRegions } from "@/hooks/useRegions";
import { FilterContext } from "@/providers/FilterProvider";
import MinisSpinner from "@/ui/MiniSpinner";
import Image from "next/image";
import { useState, forwardRef, useContext } from "react";

const Regions = forwardRef(({ open, setOpen }, ref) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { filters, setFilters } = useContext(FilterContext);

  const { regions, isLoading } = useRegions();

  const handleChange = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleFilter = () => {
    const updatedFilters = [...filters];
    selectedOptions.forEach((option) => {
      const exists = updatedFilters.some(
        (filter) => filter.type === "city" && filter.value === option
      );

      if (!exists) {
        updatedFilters.push({ type: "city", value: option });
      }
    });

    setFilters(updatedFilters);
    setOpen(false);
  };

  if (!open) return null;
  if (isLoading) return <MinisSpinner />;

  return (
    <div ref={ref}>
      <div className="absolute mt-4 bg-white border border-gray-300 w-[731px] h-[284px] -left-2 flex flex-col overflow-y-auto rounded-[10px] py-6 px-[16px] shadow-md z-30">
        <h1 className="text-base mb-4 ml-[6px]">რეგიონის მიხედვით</h1>

        <div
          className={`${slimFont.className} grid grid-cols-3 gap-x-[50px] gap-y-4 text-sm w-[679px] mb-8 h-[128px]`}
        >
          {regions?.map((item) => (
            <label key={item.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedOptions.includes(item.name)}
                onChange={() => handleChange(item.name)}
                className="peer hidden"
              />
              <div
                className={`w-4 h-4 border-2 border-gray-300 rounded-sm flex items-center justify-center  peer-checked:bg-green-600 peer-checked:border-green-600`}
              >
                <Image
                  src="/icons/checkmark.svg"
                  alt="checked"
                  width={10}
                  height={8}
                />
              </div>
              <span>{item.name}</span>
            </label>
          ))}
        </div>
        <div
          className="w-[77px] h-[33px] rounded-[8px] bg-buttonOrange flex justify-center items-center cursor-pointer text-white text-[14px] self-end"
          onClick={handleFilter}
        >
          არჩევა
        </div>
      </div>
    </div>
  );
});

Regions.displayName = "Regions";

export default Regions;
