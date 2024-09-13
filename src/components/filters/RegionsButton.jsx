import { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Regions from "./Regions";

function RegionsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const regionsRef = useRef(null);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        regionsRef.current &&
        !regionsRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log("REGIOENIIII:" + isOpen);
  return (
    <div className="relative inline-block">
      <span>
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className={`${
            isOpen ? "bg-gray-100" : "bg-white"
          } flex w-[116px] h-[35px] items-center gap-2 px-4 py-2 rounded`}
        >
          <span>რეგიონი</span>
          <span>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
        </button>
      </span>
      {isOpen && <Regions open={isOpen} setOpen={setIsOpen} ref={regionsRef} />}
    </div>
  );
}

export default RegionsButton;
