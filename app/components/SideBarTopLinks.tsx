"use client";
import { AppIcon, LibraryIcon, RecentIcon, ToggleDownIcon } from "@/assets/svgs/SideBarSvgs";
import React, { useState } from "react";

export const SideBarLink = ({ icon, link, onClick }: { icon: React.ReactNode; link: string; onClick?: React.MouseEventHandler<HTMLDivElement> }) => {
  return (
    <div className="flex w-full items-center text-center gap-3 font-medium cursor-pointer py-3" onClick={onClick}>
      {icon}
      <span>{link}</span>
    </div>
  );
};

const SideBarTopLinks = () => {
  const LibrarySubLinks = ["Lists", "Personas", "Agents", "Projects", "Prompts"];
  const [toggleLibraryLinks, setToggleLibraryLinks] = useState(false);
  return (
    <div className="w-full flex-grow overflow-y-auto overflow-x-hidden">
      <SideBarLink icon={<RecentIcon />} link="Recents" />
      <div className="w-full relative">
        <div
          className="w-full flex justify-between items-center cursor-pointer"
          onClick={() => {
            setToggleLibraryLinks(!toggleLibraryLinks);
          }}
        >
          <div className="w-fit">
            {" "}
            <SideBarLink icon={<LibraryIcon />} link="Library" />
          </div>
          <span className={`${toggleLibraryLinks ? "rotate-0" : "-rotate-90"} transition-all`}>
            <ToggleDownIcon />
          </span>{" "}
        </div>{" "}
        <div className={`w-full flex flex-col transition-all ${toggleLibraryLinks ? "pl-5 h-auto transition-all" : "h-0 overflow-hidden transition-all"}`}>
          {LibrarySubLinks.map((link, index) => {
            return (
              <p className="py-3 text-[#979797] cursor-pointer" key={index}>
                {link}
              </p>
            );
          })}
        </div>
      </div>{" "}
      <SideBarLink icon={<AppIcon />} link="App Files" />
    </div>
  );
};

export default SideBarTopLinks;
