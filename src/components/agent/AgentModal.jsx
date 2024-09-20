"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateNewAgent from "./CreateNewAgent";
import { useState } from "react";
import { slimFont } from "@/app/fonts/fontWeight";

export default function AgentModal() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div
          className="w-[203px] h-[47px] border border-buttonOrange text-buttonOrange hover:bg-hoverOrange flex justify-center items-center gap-2 rounded-lg hover:text-white"
          onClick={() => setOpen(true)}
        >
          <p className={`${slimFont.className} text-4xl`}>+</p>{" "}
          <p className="text-[16px]">აგენტის დამატება</p>
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
