"use client";
import { slimFont } from "@/app/fonts/fontWeight";
import { useCities } from "@/hooks/useCities";
import { useRegions } from "@/hooks/useRegions";
import MinisSpinner from "@/ui/MiniSpinner";
import Image from "next/image";
import { HiOutlineTrash } from "react-icons/hi2";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function CreateNewListing() {
  const { control, register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      choice: "იყიდება",
      region_id: "",
    },
  });
  const { errors, isSubmitting } = formState;

  const { regions } = useRegions();
  const { cities } = useCities();

  const [filteredCities, setFilteredCities] = useState([]);

  const changedRegion = watch("region_id");
  console.log(changedRegion);

  useEffect(() => {
    if (changedRegion) {
      setFilteredCities(
        cities?.filter((city) => city.region_id === parseInt(changedRegion))
      );
    }
  }, [changedRegion]);

  const submitFunction = (data) => {
    const formData = new FormData();
    const image = data.image[0];
    formData.append("address", data.address);
    formData.append("region", data.region_id);
    formData.append("zip_code", data.zip_code);
    formData.append("price", data.price);
    formData.append("area", data.area);
    formData.append("bedrooms", data.bedrooms);
    formData.append("image", image);

    //createNewAgent(formData);
    console.log(image);
  };
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setImagePreview(null);
    document.getElementById("image").value = "";
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[32px] mx-auto mb-[61px]">ლისტინგის დამატება</h1>
      <form
        className="flex flex-col w-[790px] h-[1211px] "
        onSubmit={handleSubmit(submitFunction)}
      >
        <div className="mb-[80px]">
          <label className="block mb-2 text-lg font-medium ">
            გარიგების ტიპი
          </label>
          <div className={`${slimFont.className} flex items-center space-x-4`}>
            <label className="flex items-center">
              <input
                type="radio"
                value="იყიდება"
                {...register("choice", { required: true })}
                className="form-radio text-green-500 border-gray-300 focus:ring-green-500"
              />
              <span className="ml-2 text-sm">იყიდება</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                value="ქირავდება"
                {...register("choice", { required: true })}
                className="form-radio text-green-500 border-gray-300 focus:ring-green-500"
              />
              <span className="ml-2 text-sm">ქირავდება</span>
            </label>
          </div>
          {errors.choice && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="mb-[80px]">
          <label className="block mb-[22px] text-lg font-medium ">
            მდებარეობა
          </label>
          <div className="flex gap-[20px]">
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
          <label className="block mb-[22px] text-lg font-medium ">
            ბინის დეტალები
          </label>
          <div className="flex gap-[20px]">
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
            className=" outline-none border border-1 border-gray-400 rounded-lg p-3 h-[120px] "
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
          <label htmlFor="image">ატვირთეთ ფოტო*</label>

          <div className="border h-[120px] border-slate-900 rounded-lg p-3 border-dashed flex justify-center items-center">
            {imagePreview ? (
              <div className="relative w-32  flex items-center justify-center">
                <Image
                  src={imagePreview}
                  alt="Uploaded Preview"
                  width={92}
                  height={82}
                  //   className="object-cover h-full"
                />
                <div
                  onClick={handleRemoveImage}
                  className="absolute top-20 right-2 cursor-pointer"
                >
                  <HiOutlineTrash />
                </div>
              </div>
            ) : (
              <label htmlFor="image" className="cursor-pointer">
                <span>
                  <Image
                    src="/icons/plus-circle.png"
                    alt="add"
                    width={24}
                    height={24}
                  />
                </span>
              </label>
            )}
            <input
              className="hidden"
              id="image"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/webp"
              {...register("image", {
                required: "სავალდებულო ველი",
                validate: {
                  size: (files) =>
                    files[0]?.size <= 5 * 1024 * 1024 ||
                    "ფოტოს ზომა არ უნდა აღემატებოდეს 1მბ-ს",
                },
              })}
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
            {errors.image && (
              <p className="text-xs text-red-400">{`${errors.image?.message}`}</p>
            )}
          </div>
        </div>
        <div className="flex gap-[31px] h-[47px] justify-end w-full mt-[91px]">
          <button
            type="button"
            className="border p-3 text-[16px] text-buttonOrange rounded-lg border-buttonOrange hover:bg-buttonOrange hover:text-white"
          >
            გაუქმება
          </button>
          <button
            className="p-3 bg-buttonOrange
 hover:bg-hoverOrange text-[16px] text-white hover-ease rounded-lg "
            disabled={isSubmitting}
          >
            {isSubmitting ? <MinisSpinner /> : "დაამატე ლისტინგი"}
          </button>
        </div>
      </form>
    </div>
  );
}
