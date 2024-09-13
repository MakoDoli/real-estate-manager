import { slimFont } from "@/app/fonts/fontWeight";
import { useRegions } from "@/hooks/useRegions";
import MinisSpinner from "@/ui/MiniSpinner";
import Image from "next/image";
import { useState, forwardRef } from "react";

const Regions = forwardRef(({ open, setOpen }, ref) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { regions, isLoading } = useRegions();

  const handleChange = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  if (!open) return null;
  if (isLoading) return <MinisSpinner />;

  return (
    <div className="relative inline-block" ref={ref}>
      <div className="absolute mt-2 bg-white border border-gray-300 w-[731px] h-[284px] overflow-y-auto p-2 shadow-md">
        <div className="mb-4">
          <h3 className="text-base">რეგიონის მიხედვით</h3>
        </div>
        <div
          className={`${slimFont.className} grid grid-cols-3 gap-2 text-sm w-[679px] h-[128px]`}
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
      </div>

      <div className="mt-4 hidden">
        <strong>Selected:</strong> {selectedOptions.join(", ")}
      </div>
    </div>
  );
});

Regions.displayName = "Regions";

export default Regions;
