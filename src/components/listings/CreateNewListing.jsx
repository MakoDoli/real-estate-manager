/* eslint-disable @next/next/no-img-element */
"use client";
import { helvetica, slimFont } from "@/app/fonts/fontWeight";
import { useCities } from "@/hooks/useCities";
import { useRegions } from "@/hooks/useRegions";
import MinisSpinner from "@/ui/MiniSpinner";
import Image from "next/image";
import { HiOutlineTrash } from "react-icons/hi2";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAgents } from "@/hooks/useAgents";
import Link from "next/link";
import { useCreateNewListing } from "@/hooks/useCreateNewListing";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateNewListing() {
  const { control, register, handleSubmit, formState, watch, reset, setValue } =
    useForm({
      defaultValues: {
        is_rental: "იყიდება",
        region_id: "",
        image: "",
      },
    });
  const { createListing, isPending } = useCreateNewListing();
  const { errors, isSubmitting } = formState;
  const router = useRouter();

  const { regions } = useRegions();
  const { cities } = useCities();
  const { agents } = useAgents();
  const queryClient = useQueryClient();
  const [filteredCities, setFilteredCities] = useState([]);

  const file = watch("image");
  const [filePreview, setFilePreview] = useState(null);
  useEffect(() => {
    if (file && file[0].name) {
      const newUrl = URL.createObjectURL(file[0]);

      if (newUrl !== filePreview) {
        setFilePreview(newUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      console.log(value, name);
      if (name !== "image")
        localStorage.setItem("listingData", JSON.stringify(value));
      if (name === "image" && value.image && value.image[0]) {
        const reader = new FileReader();
        // const newUrl = URL.createObjectURL(value[0]);
        reader.onloadend = () => {
          localStorage.setItem("listingImage", reader.result);
        };
        reader.readAsDataURL(value.image[0]);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const savedData = localStorage.getItem("listingData");
    const savedImage = localStorage.getItem("listingImage");
    console.log(savedImage);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (savedImage) setFilePreview(savedImage);

      console.log(parsedData);
      reset(parsedData);
    }
  }, [reset]);

  const changedRegion = watch("region_id");
  useEffect(() => {
    if (changedRegion) {
      setFilteredCities(
        cities?.filter((city) => city.region_id === parseInt(changedRegion))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changedRegion]);

  const handleRemoveImage = () => {
    setFilePreview(null);
    document.getElementById("image").value = "";
  };
  const submitFunction = (data) => {
    const formData = new FormData();
    const image = data.image[0];
    const is_rental = data.is_rental === "ქირავდება" ? 1 : 0;
    formData.append("address", data.address);
    formData.append("region_id", data.region_id);
    formData.append("zip_code", data.zip_code);
    formData.append("city_id", data.city_id);
    formData.append("agent_id", Number(data.agent_id));
    formData.append("price", Number(data.price));
    formData.append("area", Number(data.area));
    formData.append("bedrooms", Number(data.bedrooms));
    formData.append("image", image);
    formData.append("is_rental", Number(is_rental));
    formData.append("description", data.description);

    createListing(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["listings"],
        });
        router.push("/");
        localStorage.removeItem("formData");
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[32px] mx-auto mb-[61px]">ლისტინგის დამატება</h1>
      <form
        className="flex flex-col w-[790px] h-[1211px] "
        onSubmit={handleSubmit(submitFunction)}
      >
        <div className="mb-[80px]">
          <label className={`${helvetica.className}  mb-2 text-lg font-medium`}>
            {"გარიგების ტიპი".toUpperCase()}
          </label>
          <div className={`${slimFont.className} flex items-center space-x-4`}>
            <label className="flex items-center">
              <input
                type="radio"
                value="იყიდება"
                {...register("is_rental", { required: true })}
              />
              <span className="ml-2 text-sm">იყიდება</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                value="ქირავდება"
                {...register("is_rental", { required: true })}
              />
              <span className="ml-2 text-sm">ქირავდება</span>
            </label>
          </div>
          {errors.choice && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="mb-[80px]">
          <label
            className={`${helvetica.className}  mb-[22px] text-lg font-medium`}
          >
            {"მდებარეობა".toUpperCase()}
          </label>
          <div className="flex gap-[20px] mt-[22px]">
            <div className="flex flex-col gap-[49px]">
              <div className="flex flex-col gap-1 w-[384px] h-[64px]">
                <label htmlFor="address">მისამართი*</label>

                <input
                  className={`outline-none border border-gray-400 rounded-lg p-3 text-black font-thin h-[42px]`}
                  id="address"
                  type="text"
                  {...register("address", {
                    required: "მინიმუმ ორი სიმბოლო",
                    minLength: {
                      value: 2,
                      message: "მინიმუმ ორი სიმბოლო",
                    },
                  })}
                />
                {errors.address && (
                  <p
                    className={`${slimFont.className} text-red-500 text-xs flex items-center gap-2`}
                  >
                    {errors.address?.message}
                  </p>
                )}
                {!errors.address && (
                  <p
                    className={`${slimFont.className} text-xs flex items-center gap-2`}
                  >
                    <span>
                      <Image
                        src="/icons/check.png"
                        width={10}
                        height={8}
                        alt="check"
                      />
                    </span>
                    მინიმუმ ორი სიმბოლო
                  </p>
                )}
              </div>
              <div>
                <div className="flex flex-col gap-1 w-[384px] h-[64px]">
                  <label htmlFor="region_id">რეგიონი</label>
                  <Controller
                    name="region_id"
                    control={control}
                    rules={{ required: "აირჩიეთ რეგიონი" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`${slimFont.className} outline-none border border-1 border-gray-400 rounded-lg p-3  text-[14px] `}
                        id="region_id"
                      >
                        <option value="">აირჩიეთ რეგიონი</option>
                        {regions?.map((region) => (
                          <option
                            key={region.id}
                            className={`${slimFont.className}`}
                            value={region.id}
                          >
                            {region.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.region_id && (
                    <p className="text-xs text-red-400">
                      {errors.region_id.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[49px]">
              <div className="flex flex-col gap-1 w-[384px] h-[64px]">
                <label htmlFor="zip_code">საფოსტო ინდექსი*</label>

                <input
                  className=" outline-none border border-1 border-gray-400 rounded-lg p-3 h-[42px]  "
                  id="zip_code"
                  type="text"
                  {...register("zip_code", {
                    required: "მხოლოდ რიცხვები",
                    pattern: {
                      value: /^[0-9]+$/,

                      message: "მხოლოდ რიცხვები",
                    },
                    minLength: {
                      value: 4,
                      message: "მინიმუმ ოთხი სიმბოლო",
                    },
                  })}
                />
                {errors.zip_code && (
                  <p
                    className={`${slimFont.className} text-red-500 text-xs flex items-center gap-2`}
                  >
                    {errors.zip_code?.message}
                  </p>
                )}
                {!errors.zip_code && (
                  <p
                    className={`${slimFont.className} text-xs flex items-center gap-2`}
                  >
                    <span>
                      <Image
                        src="/icons/check.png"
                        width={10}
                        height={8}
                        alt="check"
                      />
                    </span>
                    მხოლოდ რიცხვები
                  </p>
                )}
              </div>
              {changedRegion && changedRegion !== "" && (
                <div className="flex flex-col gap-1 w-[384px] h-[64px]">
                  <label htmlFor="city_id">ქალაქი</label>
                  <Controller
                    name="city_id"
                    control={control}
                    rules={{ required: "აირჩიეთ ქალაქი" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`${slimFont.className} outline-none border border-1 border-gray-400 rounded-lg p-3  text-[14px] `}
                        id="region_id"
                      >
                        <option value="">აირჩიეთ ქალაქი</option>
                        {filteredCities?.map((region) => (
                          <option
                            key={region.id}
                            className={`${slimFont.className}`}
                            value={region.id}
                          >
                            {region.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.city_id && (
                    <p className="text-xs text-red-400">
                      {errors.city_id.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <label className={`${helvetica.className} text-lg font-medium`}>
            {"ბინის დეტალები".toUpperCase()}
          </label>
          <div className="flex gap-[20px] mt-[22px]">
            <div className="flex flex-col gap-[49px]">
              <div className="flex flex-col gap-1 w-[384px] h-[64px]">
                <label htmlFor="price">ფასი*</label>

                <input
                  className={`outline-none border border-gray-400 rounded-lg p-3 text-black font-thin h-[42px]`}
                  id="price"
                  type="text"
                  {...register("price", {
                    required: "სავალდებულო ველი",
                    pattern: {
                      value: /^[0-9]+$/,

                      message: "მხოლოდ რიცხვები",
                    },
                    minLength: 1,
                    message: "",
                  })}
                />
                {errors.price && (
                  <p
                    className={`${slimFont.className} text-red-500 text-xs flex items-center gap-2`}
                  >
                    {errors.price?.message}
                  </p>
                )}
                {!errors.price && (
                  <p
                    className={`${slimFont.className} text-xs flex items-center gap-2`}
                  >
                    <span>
                      <Image
                        src="/icons/check.png"
                        width={10}
                        height={8}
                        alt="check"
                      />
                    </span>
                    მხოლოდ რიცხვები
                  </p>
                )}
              </div>
              <div>
                <div className="flex flex-col gap-1 w-[384px] h-[64px]">
                  <label htmlFor="bedrooms">საძინებლის რაოდენობა</label>

                  <input
                    className={`outline-none border border-gray-400 rounded-lg p-3 text-black font-thin h-[42px]`}
                    id="price"
                    type="text"
                    {...register("bedrooms", {
                      required: "სავალდებულო ველი",
                      pattern: {
                        value: /^[0-9]+$/,

                        message: "მხოლოდ რიცხვები",
                      },
                      minLength: 1,
                      message: "",
                    })}
                  />
                  {errors.bedrooms && (
                    <p
                      className={`${slimFont.className} text-red-500 text-xs flex items-center gap-2`}
                    >
                      {errors.bedrooms?.message}
                    </p>
                  )}
                  {!errors.bedrooms && (
                    <p
                      className={`${slimFont.className} text-xs flex items-center gap-2`}
                    >
                      <span>
                        <Image
                          src="/icons/check.png"
                          width={10}
                          height={8}
                          alt="check"
                        />
                      </span>
                      მხოლოდ რიცხვები
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[49px]">
              <div className="flex flex-col gap-1 w-[384px] h-[64px]">
                <label htmlFor="area">ფართობი*</label>

                <input
                  className=" outline-none border border-1 border-gray-400 rounded-lg p-3 h-[42px]  "
                  id="area"
                  type="text"
                  {...register("area", {
                    required: "სავალდებულო ველი",
                    pattern: {
                      value: /^[0-9]+$/,

                      message: "მხოლოდ რიცხვები",
                    },
                    minLength: 1,
                    message: "",
                  })}
                />

                {errors.area && (
                  <p className="text-xs text-red-400">{`${errors.area?.message}`}</p>
                )}
                {!errors.area && (
                  <p
                    className={`${slimFont.className} text-xs flex items-center gap-2`}
                  >
                    <span>
                      <Image
                        src="/icons/check.png"
                        width={10}
                        height={8}
                        alt="check"
                      />
                    </span>
                    მხოლოდ რიცხვები
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div className="mt-[49px] flex flex-col gap-3">
          <label htmlFor="">აღწერა*</label>

          <textarea
            className={`${slimFont.className} text-sm outline-none border border-1 border-gray-400 rounded-lg p-3 h-[120px]`}
            id="description"
            {...register("description", {
              required: "სავალდებულო ველი",
              validate: (value) =>
                value.split(" ").length >= 6 || "მინიმუმ ხუთი სიტყვა",
            })}
          />
          {errors.description && (
            <p className="text-xs text-red-400">{`${errors.description?.message}`}</p>
          )}
          {!errors.description && (
            <p
              className={`${slimFont.className} text-xs flex items-center gap-2`}
            >
              <span>
                <Image
                  src="/icons/check.png"
                  width={10}
                  height={8}
                  alt="check"
                />
              </span>
              მინიმუმ ხუთი სიტყვა
            </p>
          )}
        </div>
        <div className="mt-[49px] flex flex-col gap-3">
          <label htmlFor="">ატვირთეთ ფოტო*</label>
          <label htmlFor="image" className=" cursor-pointer">
            <div className="  border h-[120px] border-slate-900 rounded-lg p-3 relative  border-dashed flex justify-center items-center">
              {filePreview ? (
                <div
                  onClick={handleRemoveImage}
                  className="absolute w-[24px] h-[24px] bg-white rounded-full flex justify-center items-center border border-detailsText top-[82px] left-[426px] z-30"
                >
                  <img src="./icons/trash.png" />
                </div>
              ) : null}

              <span>
                <Image
                  src="/icons/plus-circle.png"
                  alt="add"
                  width={24}
                  height={24}
                />
              </span>
              {filePreview ? (
                <img
                  src={filePreview}
                  alt="preview"
                  className="w-[92px] h-[82px] absolute"
                />
              ) : null}
            </div>
          </label>
          <div>
            <input
              className="hidden"
              id="image"
              type="file"
              accept="image/*"
              {...register("image", {
                required: "სავალდებულო ველი",
                validate: {
                  size: (files) =>
                    files[0]?.size <= 5 * 1024 * 1024 ||
                    "ფოტოს ზომა არ უნდა აღემატებოდეს 1მბ-ს",
                },
              })}
              //onChange={handleImageChange}
            />
            {errors.image && (
              <p className="text-xs text-red-400">{`${errors.image?.message}`}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 w-[384px] h-[64px] mt-[80px]">
          <label className={`${helvetica.className} text-lg font-medium`}>
            {"აგენტი".toUpperCase()}
          </label>
          <label htmlFor="region_id">აირჩიე</label>
          <Controller
            name="agent_id"
            control={control}
            rules={{ required: "აირჩიეთ რეგიონი" }}
            render={({ field }) => (
              <select
                {...field}
                className={`${slimFont.className} outline-none border border-1 border-gray-400 rounded-lg p-3  text-[14px] `}
                id="region_id"
              >
                <option value="">აგენტების სია</option>
                {agents?.map((agent) => (
                  <option
                    key={agent.id}
                    className={`${slimFont.className}`}
                    value={agent.id}
                  >
                    {agent.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.region_id && (
            <p className="text-xs text-red-400">{errors.region_id.message}</p>
          )}
        </div>
        <div className="flex gap-[31px] h-[47px] justify-end w-full mt-[91px]">
          <Link href="/">
            <button
              type="button"
              className="border p-3 text-[16px] text-buttonOrange rounded-lg border-buttonOrange hover:bg-buttonOrange hover:text-white"
            >
              გაუქმება
            </button>
          </Link>
          <button
            className="p-3 bg-buttonOrange
 hover:bg-hoverOrange w-[187px] h-[47px] text-[16px] text-white hover-ease rounded-lg "
            disabled={isSubmitting}
          >
            {isPending ? <MinisSpinner /> : "დაამატე ლისტინგი"}
          </button>
        </div>
      </form>
    </div>
  );
}
