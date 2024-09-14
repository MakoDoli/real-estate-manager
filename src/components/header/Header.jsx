import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header className="w-full h-[100px] flex items-center px-[162px]">
      <Link href={"/"}>
        <Image
          src="/logos/redLogo.png"
          width={150}
          height={24}
          alt="'logo"
          className="cursor-pointer "
        />
      </Link>
    </header>
  );
}
