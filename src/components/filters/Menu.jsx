import React from "react";
import RegionsButton from "./RegionsButton";
import AgentModal from "../agent/AgentModal";

export default function Menu() {
  return (
    <div className="flex justify-between m-auto">
      <div className="h-[47px]">
        <RegionsButton />
      </div>
      <AgentModal />
    </div>
  );
}
