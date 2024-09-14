import React from "react";
import RegionsButton from "./RegionsButton";
import AgentModal from "../agent/AgentModal";
import PriceRange from "./PriceRange";
import { slimFont } from "@/app/fonts/fontWeight";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="flex justify-between items-center w-[1596px]   mb-4">
      <div className="h-[47px] w-[785px] flex gap-6 border border-gray-200 rounded-lg ">
        <RegionsButton />
        <PriceRange />
      </div>

      <div className=" flex gap-4 items-center">
        <Link href="/create-listing">
          <div className="w-[230px] h-[47px] border border-buttonOrange bg-buttonOrange text-white hover:bg-hoverOrange flex justify-center items-center gap-2 rounded-lg cursor-pointer ">
            <p className={`${slimFont.className} text-4xl`}>+</p>{" "}
            <p className="text-[16px]">ლისტინგის დამატება</p>
          </div>
        </Link>
        <AgentModal />
      </div>
    </div>
  );
}
