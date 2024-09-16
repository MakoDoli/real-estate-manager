/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateNewAgent from "../agent/CreateNewAgent";

export default function AddNewAgent() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex border-b cursor-pointer border-gray-400 px-3 w-[384px] gap-2 h-[42px] items-center">
          <img src="/icons/plus-circle.png" alt="plus"></img>
          <p>აგენტის დამატება</p>
        </div>
      </DialogTrigger>
      <DialogContent className="flex h-full max-h-[784px]  flex-col max-w-[1009px]  items-center overflow-y-auto justify-center gap-8">
        <DialogHeader className="items-center">
          <DialogTitle className="text-[32px]">აგენტის დამატება</DialogTitle>
        </DialogHeader>
        <CreateNewAgent setOpen={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
