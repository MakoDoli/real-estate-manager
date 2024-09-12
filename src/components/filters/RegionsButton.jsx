import { useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Regions from "./Regions";
function RegionsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className={` ${
          isOpen ? "bg-gray-100" : "bg-white"
        } flex w-[116px] h-[35px] items-center gap-2 px-4 py-2 rounded`}
      >
        რეგიონი
        <span>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
      </button>
      {isOpen && <Regions open={isOpen} />}
    </div>
  );
}

export default RegionsButton;
