import { ToggleDownIcon } from "@/assets/svgs/SideBarSvgs";
import React from "react";

const Header = () => {
  const TopLinks = [
    { name: "Dashboard", link: "dashboard" },
    { name: "My Apps", link: "my-apps" },
    { name: "App Store", link: "app-store" },
  ];
  return (
    <header className="w-full flex justify-between bg-primaryBlack text-primaryWhite py-2 px-5 items-center border-b border-secondaryBlack">
      <div></div>
      <nav className="w-fit">
        <ul className="flex items-center gap-x-[2.25rem] py-3">
          {TopLinks.map((link, index) => {
            // it's supposed to return a Link tag but since it's not navigating to anywhere it will be a list for now
            return (
              <li key={index}>
                <p>{link.name}</p>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex items-center gap-2">
        <p className="h-[2.125rem] w-[2.125rem] flex flex-col justify-center items-center bg-primary rounded-full text-primaryBlack text-xs font-medium">AP</p>
        <ToggleDownIcon />
      </div>
    </header>
  );
};

export default Header;
