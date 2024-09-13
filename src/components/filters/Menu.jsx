import React from "react";
import RegionsButton from "./RegionsButton";
import AgentModal from "../agent/AgentModal";
import PriceRange from "./PriceRange";

export default function Menu() {
  return (
    <div className="flex justify-between m-auto ">
      <div className="h-[47px] flex gap-6">
        <RegionsButton />
        <PriceRange />
      </div>
      <AgentModal />
    </div>
  );
}
