"use client";
import React from "react";
import NotFoundImage from "@/assets/images/NotFound.jpg";
import { useRouter } from "next/navigation";
import GeneralButton from "./common/GeneralButton";

const CustomeError = () => {
  const navigate = useRouter();
  return (
    <main className="w-full min-h-[80vh] flex text-transparent flex-col items-center justify-center gap-y-[1rem] px-[1.5rem]">
      <p
        className="bg-clip-text text-[10rem]"
        style={{
          backgroundImage: `url(${NotFoundImage.src})`,
          backgroundClip: "text",
        }}
      >
        Oops!
      </p>
      <p className="text-black">Error fetching contents</p>
      <p></p>
      <div className="w-fit">
        <GeneralButton
          text="Refresh"
          onclick={() => {
            navigate.refresh();
          }}
        />
      </div>
    </main>
  );
};

export default CustomeError;
