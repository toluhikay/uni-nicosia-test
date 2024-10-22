import React from "react";
import SideBarTop from "./SideBarTop";
import SibeBarBottomLinks from "./SibeBarBottomLinks";

const SideBar = () => {
  return (
    <aside className="h-full bg-primaryBlack w-[16rem]  p-5 text-primaryWhite border border-secondaryBlack hidden md:flex flex-col justify-between">
      <SideBarTop />
      <SibeBarBottomLinks />
    </aside>
  );
};

export default SideBar;
