/* eslint-disable @next/next/no-img-element */
import { slimFont } from "@/app/fonts/fontWeight";
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const [agent, setAgent] = useState(0);
  const names = [
    { name: "john", id: 1 },
    { name: "Sam", id: 2 },
  ];
  console.log(agent);

  return (
    <div className={`${slimFont.className} text-[14px] text-iconGray`}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${slimFont.className} text-[14px] w-[384px]  h-[42px] border py-4 border-gray-400 rounded-xl flex items-center px-3 justify-between`}
      >
        <p>აგენტების სია</p>
        <span>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
      </div>
      <div className="w-[384px] border  border-gray-400 rounded-b-lg">
        <div className="flex border-b border-gray-400 px-3 gap-2 h-[42px] items-center">
          <img src="/icons/plus-circle.png" alt="plus"></img>
          <p>აგენტის დამატება</p>
        </div>
        {names.map((agent, index, arr) => (
          <div
            key={agent.id}
            className={`flex ${
              index < arr.length - 1 ? "border-b border-gray-400" : ""
            } px-3 gap-2 h-[42px] items-center`}
          >
            <p>{agent.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
