/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { slimFont } from "@/app/fonts/fontWeight";
import { createNewAgent } from "@/service/apiAgents";
import MinisSpinner from "@/ui/MiniSpinner";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateNewAgent({ setOpen }) {
  const { register, handleSubmit, formState, reset, watch } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      avatar: null,
    },
  });
  const { errors, isSubmitting } = formState;
  const queryClient = useQueryClient();

  const file = watch("avatar");
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    if (file && file[0]?.name) {
      const newUrl = URL.createObjectURL(file[0]);
      if (newUrl !== filePreview) {
        setFilePreview(newUrl);
      }
    }
  }, [file]);

  const handleRemoveImage = () => {
    setFilePreview(null);
    document.getElementById("avatar").value = "";
  };

  const submitFunction = (data) => {
    const formData = new FormData();
    const avatar = data.avatar[0];
    formData.append("name", data.name);
    formData.append("surname", data.surname || "");
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    formData.append("avatar", avatar);

    createNewAgent(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["agents"] });
        setOpen();
      },
    });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submitFunction)}>
      <div className="flex gap-[31px]">
        <div className="flex flex-col gap-[49px]">
          <div className="flex flex-col gap-1 w-[384px] h-[64px]">
            <label htmlFor="name">სახელი*</label>

            <input
              className={`outline-none border ${
                errors.name ? "border-red-500" : "border-gray-400"
              } rounded-lg p-3 text-black font-thin`}
              id="name"
              type="text"
              {...register("name", {
                required: "მინიმუმ ორი სიმბოლო",
                minLength: {
                  value: 2,
                  message: "მინიმუმ ორი სიმბოლო",
                },
              })}
            />
            {errors.name && (
              <p
                className={`${slimFont.className} text-red-500 text-xs flex items-center gap-2`}
              >
                {errors.name?.message}
              </p>
            )}
            {!errors.name && (
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
              <label htmlFor="email">ელ-ფოსტა*</label>

              <input
                className={`outline-none border ${
                  errors.email ? "border-red-500" : "border-gray-400"
                } rounded-lg p-3 text-black font-thin`}
                type="email"
                id="email"
                {...register("email", {
                  required: "",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format",
                  },
                  validate: (value) =>
                    value.endsWith("@redberry.ge") ||
                    "გამოიყენეთ @redberry.ge ფოსტა",
                })}
              />
              {errors.email && (
                <p className="text-xs text-red-400">{`${errors.email?.message}`}</p>
              )}
              {!errors.email && (
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
                  გამოიყენეთ @redberry.ge ფოსტა
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[49px]">
          <div className="flex flex-col gap-1 w-[384px] h-[64px]">
            <label htmlFor="surname">გვარი</label>
            {errors.surname && (
              <p className="text-xs text-red-400">{`${errors.surname?.message}`}</p>
            )}
            <input
              className={`outline-none border ${
                errors.surname ? "border-red-500" : "border-gray-400"
              } rounded-lg p-3 text-black font-thin`}
              id="surname"
              type="text"
              {...register("surname", {
                minLength: {
                  value: 2,
                  message: "მინიმუმ ორი სიმბოლო",
                },
              })}
            />
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
          </div>
          <div className="flex flex-col gap-1 w-[384px] h-[64px]">
            <label htmlFor="phone">ტელეფონის ნომერი</label>

            <input
              className={`outline-none border ${
                errors.phone ? "border-red-500" : "border-gray-400"
              } rounded-lg p-3 text-black font-thin`}
              id="phone"
              type="text"
              {...register("phone", {
                pattern: {
                  value: /^5\d{8}$/,
                  message: "ტელეფონის ნომერი უნდა იყოს 5XXXXXXXX ფორმატში",
                },
              })}
            />
            {errors.phone && (
              <p className="text-xs text-red-400">{`${errors.phone?.message}`}</p>
            )}
            {!errors.phone && (
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
      <div className="mt-[49px] flex flex-col gap-3">
        <label htmlFor="">ატვირთეთ ფოტო*</label>
        <label htmlFor="image" className=" cursor-pointer">
          <div className="  border h-[120px] border-slate-900 rounded-lg p-3 relative  border-dashed flex justify-center items-center">
            {filePreview ? (
              <div
                onClick={handleRemoveImage}
                className={`absolute w-[24px] h-[24px] bg-white rounded-full flex justify-center items-center border ${
                  errors.avatar ? "border-red-500" : "border-detailsText"
                }  top-[82px] left-[426px] z-30`}
              >
                <img src="./icons/trash.png" alt="remove" />
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
            {...register("avatar", {
              required: "სავალდებულო ველი",
              validate: {
                size: (files) =>
                  files[0]?.size <= 5 * 1024 * 1024 ||
                  "ფოტოს ზომა არ უნდა აღემატებოდეს 1მბ-ს",
              },
            })}
          />
          {errors.avatar && (
            <p className="text-xs text-red-400">{`${errors.avatar?.message}`}</p>
          )}
        </div>
      </div>
      <div className="flex gap-[31px] h-[47px] justify-end w-full mt-[91px]">
        <button
          onClick={setOpen}
          type="button"
          className="border p-3 text-[16px] text-buttonOrange rounded-lg border-buttonOrange hover:bg-buttonOrange hover:text-white"
        >
          გაუქმება
        </button>
        <button
          className="p-3 bg-buttonOrange hover:bg-hoverOrange text-[16px] text-white hover-ease rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? <MinisSpinner /> : "დაამატე აგენტი"}
        </button>
      </div>
    </form>
  );
}
