import React from "react";
import SideBarTop from "./SideBarTop";
import SibeBarBottomLinks from "./SibeBarBottomLinks";
import { CloseIcon } from "@/assets/svgs/DashboardSvgs";

const SideBarMobile = ({ setModalOpen }: { setModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <aside className="h-full bg-primaryBlack w-[20rem]  p-5 text-primaryWhite border border-secondaryBlack md:hidden flex flex-col justify-between">
      <div
        className="absolute top-0 right-0 p-4 cursor-pointer"
        onClick={() => {
          setModalOpen(false);
        }}
      >
        <CloseIcon />
      </div>
      <SideBarTop setModalOpen={setModalOpen} />
      <SibeBarBottomLinks />
    </aside>
  );
};

export default SideBarMobile;
