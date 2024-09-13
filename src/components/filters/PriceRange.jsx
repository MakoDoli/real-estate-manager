"use client";

import * as React from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PriceRange() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  console.log(open);

  const handleOpenChange = (check) => {
    setOpen(check);
  };
  return (
    <div className="flex">
      <DropdownMenu onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger
          asChild
          className={` 
           text-md border-none shadow-none `}
        >
          <Button
            variant="custom"
            className={`${open ? "bg-gray-100" : "bg-white"}`}
          >
            საფასო კატეგორია{" "}
            <span className="ml-2">
              {open ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>ფასის მიხედვით</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
            disabled
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
