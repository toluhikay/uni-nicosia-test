import Image from "next/image";
import React from "react";
import Logo from "@/assets/images/UNIC-Horizontal.png";
import SideBarTopLinks from "./SideBarTopLinks";

const SideBarTop = () => {
  return (
    <div className="w-full flex flex-col gap-y-[1rem] max-h-[60%]">
      <div className="w-full flex flex-col gap-y-[.5rem]">
        <Image className="w-[5rem] cursor-pointer h-auto" src={Logo.src} width={200} height={200} alt="UNIC Logo" />
        <button className="w-full bg-primary p-4 rounded-full flex items-start text-primaryBlack font-semibold">+ New Chat</button>
      </div>{" "}
      <SideBarTopLinks />
    </div>
  );
};

export default SideBarTop;
