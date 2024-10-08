/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateNewAgent from "../agent/CreateNewAgent";

export default function AddNewAgent({ setModal }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog onOpenChange={setModal}>
      <DialogTrigger>
        <div
          className="flex border-b cursor-pointer border-gray-400 px-3 w-[384px] gap-2 h-[42px] items-center"
          onClick={() => {
            setModal();
            setOpen(true);
          }}
        >
          <img src="/icons/plus-circle.png" alt="plus"></img>
          <p>აგენტის დამატება</p>
        </div>
      </DialogTrigger>
      {open && (
        <DialogContent className="flex h-full max-h-[784px]  flex-col max-w-[1009px]  items-center overflow-y-auto justify-center gap-8">
          <DialogHeader className="items-center">
            <DialogTitle className="text-[32px]">აგენტის დამატება</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <section>
              <p id="agent-form-description" className="sr-only">
                create new agent
              </p>
              <CreateNewAgent setOpen={() => setOpen(false)} />
            </section>
          </DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  );
}
