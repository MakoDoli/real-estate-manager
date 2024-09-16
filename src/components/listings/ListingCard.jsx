/* eslint-disable @next/next/no-img-element */
import { boldFont, slimFont } from "@/app/fonts/fontWeight";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ListingCard({ item }) {
  return (
    <div className=" w-[384px] h-[455px] rounded-[14px] shadow-md relative  ">
      <div className="w-[90px] h-[30px] rounded-3xl bg-iconGray bg-opacity-50 absolute z-10 text-white text-[12px] flex justify-center items-center top-[23px] left-[23px]">{`${
        item.is_rental === 1 ? "ქირავდება" : "იყიდება"
      }`}</div>

      <Link href={`/${item.city.region.id}/${item.id}/details`}>
        <img
          src={item.image}
          width={384}
          height={307}
          alt="listing-image "
          className="rounded-lg h-[307px] w-[384px]"
        />
      </Link>
      <div className="px-[25px] py-[22px]">
        <p className={`${boldFont.className} text-[28px]`}>{item.price} ₾</p>
        <div className="flex gap-2 mt-1 mb-5">
          <Image
            src="/icons/locpin.svg"
            alt="pin-icon"
            width={18}
            height={18}
          />
          <p
            className={`${slimFont.className} text-[16px] iconGray opacity-70 `}
          >
            {item.city.name}, {item.address}
          </p>
        </div>
        <div className="flex gap-[32px] items-center">
          <div className="flex gap-1 items-center">
            <Image src="/icons/bed.png" alt="bed-icon" width={24} height={24} />
            <p
              className={`${slimFont.className} text-[16px] iconGray opacity-70 `}
            >
              {item.bedrooms}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <img src="/icons/square.png" alt="bed-icon" className="h-[18px]" />
            <p
              className={`${slimFont.className} text-[16px] iconGray opacity-70 `}
            >
              {item.area} მ<sup>2</sup>
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <img src="/icons/zipcode.png" alt="bed-icon" className="h-[18px]" />
            <p
              className={`${slimFont.className} text-[16px] iconGray opacity-70 `}
            >
              {item.zip_code}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
