import React from "react";
import SideBarTop from "./SideBarTop";
import SibeBarBottomLinks from "./SibeBarBottomLinks";

const SideBarMobile = ({ setModalOpen }: { setModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <aside className="h-full bg-primaryBlack w-[20rem]  p-5 text-primaryWhite border border-secondaryBlack md:hidden flex flex-col justify-between">
      <SideBarTop setModalOpen={setModalOpen} />
      <SibeBarBottomLinks />
    </aside>
  );
};

export default SideBarMobile;
