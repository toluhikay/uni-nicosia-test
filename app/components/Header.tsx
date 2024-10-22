import { ToggleDownIcon } from "@/assets/svgs/SideBarSvgs";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/assets/images/UNIC-Horizontal.png";
import { RxHamburgerMenu } from "react-icons/rx";
import SideBarMobile from "./SideBarMobile";
import dynamic from "next/dynamic";

const DropDown = dynamic(() => import("@/app/components/DropDown"), { ssr: false });

const Header = () => {
  const [sideBarMobile, setSideBarMobile] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const TopLinks = [
    { name: "Dashboard", link: "dashboard" },
    { name: "My Apps", link: "my-apps" },
    { name: "App Store", link: "app-store" },
  ];
  return (
    <header className="w-full flex justify-between bg-primaryBlack text-primaryWhite py-2 px-5 items-center border-b border-secondaryBlack">
      <div className="flex gap-2 items-center">
        {" "}
        <RxHamburgerMenu
          className="md:hidden cursor-pointer"
          onClick={() => {
            setSideBarMobile(!sideBarMobile);
          }}
        />
        <Image className="w-[5rem] md:hidden cursor-pointer h-auto" src={Logo.src} width={200} height={200} alt="UNIC Logo" />
      </div>
      <nav className="w-fit lg:flex hidden">
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
      <div
        className="flex items-center gap-2 cursor-pointer relative"
        onClick={() => {
          setDropDown(!dropDown);
        }}
      >
        <p className="h-[2.125rem] w-[2.125rem] flex flex-col justify-center items-center bg-primary rounded-full text-primaryBlack text-xs font-medium">AP</p>
        <ToggleDownIcon />
        {<DropDown displayState={dropDown} setDisplayState={setDropDown} />}
      </div>
      <div className={`fixed top-0 z-[99999] ${sideBarMobile ? "left-0" : "left-[-300%]"} transition-all md:hidden  h-full w-full bg-black/80`}>
        <div
          className="absolute top-0 left-0 w-full h-full z-[222] bg-bl cursor-pointer"
          onClick={() => {
            setSideBarMobile(false);
          }}
        ></div>
        <div className="w-fit relative h-full z-[999]">
          <SideBarMobile setModalOpen={setSideBarMobile} />
        </div>{" "}
      </div>
    </header>
  );
};

export default Header;
