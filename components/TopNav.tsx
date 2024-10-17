import { EditIcon } from "@/assets/svgs/DashboardSvgs";
import React, { useState } from "react";
import TabState from "./TabState";
import TopNavTabState from "./TopNavTabState";
import TopNavActions from "./TopNavActions";

const TopNav = () => {
  return (
    <nav className="w-full flex justify-between bg-primaryBlack text-primaryWhite py-2 px-5 items-center border-b border-secondaryBlack">
      <div className="py-3 flex items-center gap-2 cursor-pointer">
        <p>Front-End Task</p>
        <EditIcon />
      </div>
      <div>
        <TopNavTabState />
      </div>
      <div>
        <TopNavActions />
      </div>
    </nav>
  );
};

export default TopNav;
