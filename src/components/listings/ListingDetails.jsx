/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import useListingDetails from "../../hooks/useListingDetails";
import { boldFont, slimFont, mediumFont } from "@/app/fonts/fontWeight";
import Link from "next/link";
import Spinner from "../ui/Spinner";
import useDeleteListing from "@/hooks/useDeleteListing";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MinisSpinner from "../ui/MiniSpinner";
import CarouselContainer from "../carousel/CarouselContainer";
export default function ListingDetails({ id }) {
  const { listingDetails, isLoading, error } = useListingDetails();
  const { isRemovingListing, removeListing } = useDeleteListing();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  console.log(open);
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

  const date = new Date(created_at);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  return (
    <div>
      <Link href="/">
        <img
          src="/icons/back.png"
          className="mb-[29px] cursor-pointer"
          alt="back"
        />
      </Link>
      <div className="flex gap-[68px] relative ">
        <div className="w-[142px] h-[41px] rounded-3xl bg-iconGray bg-opacity-50 flex justify-center items-center absolute z-10 text-white top-[26px] text-[20px] left-[44px]">
          {`${is_rental === 1 ? "ქირავდება" : "იყიდება"}`}
        </div>

        <Image
          src={image}
          alt="item-image"
          height={670}
          width={839}
          layout="fixed"
          className="rounded-t-2xl "
          style={{ height: "670px", width: "839px" }}
        />

        <div>
          <p
            className={`${boldFont.className} text-[48px] mt-[30px] leading-[57px]`}
          >
            {price} ₾
          </p>
          <div className="flex flex-col  mt-[24px]">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <img
                  src="/icons/locpin.png"
                  className="w-[16px] h-[19px]"
                  alt="location"
                />
                <p
                  className={`${slimFont.className} text-detailsText text-[24px] leading-7`}
                >
                  {city.name}, {address}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src="/icons/square.png"
                  className="w-[17px] h-[17px]"
                  alt="area"
                />
                <p
                  className={`${slimFont.className} text-detailsText text-[24px] leading-7`}
                >
                  ფართი {area} მ<sup>2</sup>
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src="/icons/bed.png"
                  className="w-[22px] h-[22px]"
                  alt="bed"
                />
                <p
                  className={`${slimFont.className} text-detailsText text-[24px] leading-7`}
                >
                  საძინებელი {bedrooms}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <img
                  src="/icons/zipcode.png"
                  className="w-[18px] h-[21px]"
                  alt="zipcode"
                />
                <p
                  className={`${slimFont.className} text-detailsText text-[24px] leading-7`}
                >
                  საფოსტო ინდექსი {zip_code}
                </p>
              </div>
            </div>
            <div
              className={`${slimFont.className} mt-[40px] text-detailsText text-[16px] min-h-[78px] leading-[26px]`}
            >
              {description}
            </div>
            <div
              className={`${slimFont.className} text-[14px] leading-[17px] text-detailsText px-[20px] pt-[24px] pb-[20px] w-[503px] mt-[50px] border border-gray-200 rounded-lg`}
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
                  <p className="text-[16px] leading-[19px] text-iconGray">
                    {name} {surname}
                  </p>
                  <p>აგენტი</p>
                </div>
              </div>
              <div className="flex gap-1 items-center mt-[16px]">
                <img src="/icons/email.png" alt="email" className="h-[13px]" />
                <p>{email}</p>
              </div>
              <div className="flex gap-1 items-center mt-[4px]">
                <img src="/icons/phone.png" alt="email" className="h-[13px]" />
                <p>{phoneNumber}</p>
              </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <div
                  className={`${mediumFont.className} w-[131px] h-[34px] border border-deleteGray rounded-md text-[12px] text-deleteGray mt-5 flex justify-center items-center cursor-pointer`}
                  onClick={() => setOpen(true)}
                >
                  ლისტინგის წაშლა
                </div>
              </DialogTrigger>
              {open && (
                <DialogContent className="w-[623px] h-[222px] flex flex-col items-center justify-center ">
                  <DialogHeader className="items-center">
                    <DialogTitle
                      className={`${slimFont.className} text-[20px] text-deleteListing tracking-wide`}
                    >
                      გსურთ წაშალოთ ლისტინგი?
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex justify-center items-center gap-[15px]">
                    <div
                      className={` rounded-[10px] border border-buttonOrange h-[47px] flex items-center px-[16px] text-buttonOrange text-[16px] cursor-pointer`}
                      onClick={() => setOpen(false)}
                    >
                      გაუქმება
                    </div>
                    <div
                      className="w-[145px] flex justify-center items-center text-[16px] h-[47px] bg-buttonOrange text-white rounded-[10px] hover:bg-hoverOrange cursor-pointer"
                      onClick={() => {
                        removeListing(id, {
                          onSuccess: () => router.push("/"),
                        });
                      }}
                    >
                      {isRemovingListing ? <MinisSpinner /> : "დადასტურება"}
                    </div>
                    <div></div>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </div>
      </div>
      <div
        className={`${slimFont.className} mt-3 text-detailsText text-[16px] ml-[573px] tracking-wide`}
      >
        გამოქვეყნების თარიღი {formattedDate}{" "}
      </div>
      <div className="text-[32px] my-[52px]">ბინები მსგავს ლოკაციაზე</div>
      <CarouselContainer region={city.region.id} />
    </div>
  );
}
