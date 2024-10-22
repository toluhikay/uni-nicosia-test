import React from "react";
import { SideBarLink } from "./SideBarTopLinks";
import { DeleteIcon, ShareIcon } from "@/assets/svgs/SideBarSvgs";

const SibeBarBottomLinks = () => {
  return (
    <div className="w-full">
      <div className="w-full rounded-lg overflow-hidden font-medium bg-[#202020]">
        <div className="flex justify-between p-4">
          <div className="flex flex-col gap-y-[.25rem]">
            <p className="text-primaryWhite font-sm font-medium">125,000 tokens left</p>
            <p className="text-xs font-[#666666]">~145,000 words </p>
          </div>
          <div></div>
        </div>
        <p className="px-4 py-3 bg-[#282828] text-sm text-[#8E8E8E] cursor-pointer">See My Plan</p>{" "}
      </div>
      <div className="my-3"></div>
      <SideBarLink icon={<ShareIcon />} link="Shared" />
      <SideBarLink icon={<DeleteIcon />} link="Recently Deleted" />
    </div>
  );
};

export default SibeBarBottomLinks;
