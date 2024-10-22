"use client";
import React from "react";
import GeneralButton from "../common/GeneralButton";
import NotFoundImage from "@/assets/images/NotFound.jpg";
import { useRouter } from "next/navigation";

const ContentNotFound = () => {
  const navigate = useRouter();
  return (
    <main className="w-full h-full flex bg-primaryBlack text-transparent flex-col items-center justify-center gap-y-[1rem]">
      <p
        className="bg-clip-text text-[10rem]"
        style={{
          backgroundImage: `url(${NotFoundImage.src})`,
          backgroundClip: "text",
        }}
      >
        Oops!
      </p>
      <p className="text-white">404 - PAGE NOT FOUND</p>
      <p></p>
      <div className="w-fit">
        <GeneralButton
          text="Go Home"
          onclick={() => {
            navigate.push("/");
          }}
        />
      </div>
    </main>
  );
};

export default ContentNotFound;
