import React from "react";
import AgentModal from "../agent/AgentModal";
import PriceRange from "./PriceRange";
import { slimFont } from "@/app/fonts/fontWeight";
import Link from "next/link";
import MenuButton from "./MenuButton";
import FilterList from "./FilterList";
import AreaRange from "./AreaRange";
import Regions from "./Regions";
import BedroomCount from "./BedroomCount";

export default function Menu() {
  return (
    <div className="flex relative justify-between items-center w-[1596px]   mb-[77px]">
      <FilterList />
      <div className="h-[47px] w-[785px] flex gap-4 border border-gray-200 items-center px-[5px] rounded-lg ">
        <MenuButton PassedComponent={Regions} buttonText={"რეგიონი"} />
        <MenuButton
          PassedComponent={PriceRange}
          buttonText={"საფასო კატეგორია"}
        />
        <MenuButton PassedComponent={AreaRange} buttonText={"ფართობი"} />
        <MenuButton
          PassedComponent={BedroomCount}
          buttonText={"საძინებლების რაოდენობა"}
        />
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
