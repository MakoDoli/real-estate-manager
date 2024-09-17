import React, { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function MenuButton({ PassedComponent, buttonText }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        contentRef.current &&
        !contentRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <span>
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className={`${
            isOpen ? "bg-gray-100" : "bg-white"
          } flex h-[35px] text-iconGray gap-1 items-center text=[16px]  px-4 py-2 rounded`}
        >
          <span>{buttonText}</span>
          <span>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
        </button>
      </span>
      {isOpen && (
        <PassedComponent
          ref={contentRef}
          open={isOpen}
          setOpen={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default MenuButton;
