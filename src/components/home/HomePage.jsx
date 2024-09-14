"use client";
import React from "react";

import Menu from "../filters/Menu";
import Listings from "../listings/Listings";

export default function HomePage() {
  return (
    <main className="px-[162px] py-[77px]">
      <Menu />
      <Listings />
    </main>
  );
}
