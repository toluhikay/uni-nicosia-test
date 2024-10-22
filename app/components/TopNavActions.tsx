import { CopyIcon, DownloadIcon, ForwardIcon } from "@/assets/svgs/DashboardSvgs";
import { ToggleDownIcon } from "@/assets/svgs/SideBarSvgs";
import React from "react";

const ActionWrapper = ({ children }: { children: React.ReactNode }) => {
  // todo - onclick functionality
  return <div className="bg-secondaryBlack p-3 flex justify-center items-center rounded-lg gap-3 min-h-[2.25rem]">{children}</div>;
};

const TopNavActions = () => {
  return (
    <div className="flex items-center gap-4">
      <ActionWrapper>
        <p>ChatGPT 4o</p>
        <ToggleDownIcon />
      </ActionWrapper>
      <ActionWrapper>
        <CopyIcon />{" "}
      </ActionWrapper>
      <ActionWrapper>
        <DownloadIcon />{" "}
      </ActionWrapper>
      <ActionWrapper>
        <ForwardIcon />
      </ActionWrapper>
    </div>
  );
};

export default TopNavActions;
