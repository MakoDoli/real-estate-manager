import React from "react";
import Image from "next/image";
export default function Header() {
  return (
    <header className="w-full h-[100px] flex items-center px-40">
      <Image src="/logos/redLogo.png" width={150} height={24} alt="'logo" />
    </header>
  );
}
