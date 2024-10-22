import { DownloadIcon, EditIcon } from "@/assets/svgs/DashboardSvgs";
import { ShareIcon } from "@/assets/svgs/SideBarSvgs";
import React from "react";

const PromptDefaultMessage = () => {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="bg-[#15272A] p-5 text-primaryWhite w-fit rounded-[.75rem] flex flex-col gap-3">
        <p className="text-xs text-[#969696] font-semibold">DEFAULT PERSONA</p>
        <p className="font-medium">World-Class React/Front-End Developer</p>
      </div>
      <div className="flex flex-col gap-[1.25rem]">
        <p>World-Class React/Front-End Developer</p>
        <p>How can I help you today to ensure your prompts yield the best possible results?</p>
        <div className="bg-[#202020] w-fit rounded flex items-center p-3 gap-6">
          <EditIcon />
          <DownloadIcon />
          <ShareIcon />
        </div>
      </div>
    </div>
  );
};

export default PromptDefaultMessage;
