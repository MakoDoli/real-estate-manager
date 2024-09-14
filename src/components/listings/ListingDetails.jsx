"use client";
import Image from "next/image";
import useListingDetails from "../../hooks/useListingDetails";
import { boldFont, slimFont, mediumFont } from "@/app/fonts/fontWeight";
import Link from "next/link";
import Spinner from "../ui/Spinner";
export default function ListingDetails({ id, region }) {
  const { listingDetails, isLoading, error } = useListingDetails();
  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <Spinner />;
  const {
    price,
    address,
    city,
    area,
    bedrooms,
    image,
    zip_code,
    description,
    agent,
    created_at,
    is_rental,
  } = listingDetails;
  const { name, surname, avatar, phone, email } = agent;
  const phoneNumber = phone.replace(/(.{3})/g, "$1 ");
  console.log(listingDetails);
  const date = new Date(created_at);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  return (
    <div>
      <Link href="/">
        <img src="/icons/back.png" className="mb-[29px] cursor-pointer" />
      </Link>
      <div className="flex gap-[68px] relative">
        <div className="w-[142px] h-[41px] rounded-3xl bg-iconGray bg-opacity-50 flex justify-center items-center absolute z-10 text-white top-[26px] text-[20px] left-[44px]">
          {`${is_rental === 1 ? "ქირავდება" : "იყიდება"}`}
        </div>

        <Image src={image} alt="item-image" height={670} width={839} />
        <div>
          <p className={`${boldFont.className} text-[48px] mt-[30px]`}>
            {price} ₾
          </p>
          <div className="flex flex-col gap-4 mt-[24px]">
            <div className="flex gap-2 items-center">
              <img src="/icons/locpin.png" className="w-[22px] h-[22px]" />
              <p className={`${slimFont.className} text-detailsText text-2xl`}>
                {city.name}, {address}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <img src="/icons/square.png" className="w-[22px] h-[22px]" />
              <p className={`${slimFont.className} text-detailsText text-2xl`}>
                ფართი {area} მ<sup>2</sup>
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <img src="/icons/bed.png" className="w-[22px] h-[22px]" />
              <p className={`${slimFont.className} text-detailsText text-2xl`}>
                საძინებელი {bedrooms}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <img src="/icons/zipcode.png" className="w-[22px] h-[22px]" />
              <p className={`${slimFont.className} text-detailsText text-2xl`}>
                საფოსტო ინდექსი {zip_code}
              </p>
            </div>
            <div
              className={`${slimFont.className} mt-[40px] text-detailsText text-[16px]`}
            >
              {description}
            </div>
            <div
              className={`${slimFont.className} text-[14px] text-detailsText px-[20px] py-[24px] mt-[50px] border border-gray-200 rounded-lg`}
            >
              <div className="flex gap-[14px] items-center">
                <Image
                  src={avatar}
                  alt="agent-avatar"
                  width={72}
                  height={72}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-[16px] text-iconGray">
                    {name} {surname}
                  </p>
                  <p>აგენტი</p>
                </div>
              </div>
              <div className="flex gap-1 items-center mt-[18px]">
                <img src="/icons/email.png" alt="email" className="h-[13px]" />
                <p>{email}</p>
              </div>
              <div className="flex gap-1 items-center mt-[4px]">
                <img src="/icons/phone.png" alt="email" className="h-[13px]" />
                <p>{phoneNumber}</p>
              </div>
            </div>
            <div
              className={`${mediumFont.className} w-[131px] h-[34px] border border-deleteGray rounded-md text-[12px] text-deleteGray flex justify-center items-center`}
            >
              ლისტინგის წაშლა
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${slimFont.className} mt-3 text-detailsText text-[16px] ml-[573px]`}
      >
        გამოქვეყნების თარიღი {formattedDate}{" "}
      </div>
    </div>
  );
}
