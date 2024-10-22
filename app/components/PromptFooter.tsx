import React from "react";
import { SideBarLink } from "./SideBarTopLinks";
import useModalStore from "@/lib/store/modalStore";
import { AddIcon, CommandIcon, PersonaIcon, PromptIcon } from "@/assets/svgs/DashboardSvgs";
import { ModalEnum } from "@/constants/modalConstants";

const PromptFooter = () => {
  const { openModal } = useModalStore();

  return (
    <div className="w-full flex items-center justify-between py-2">
      <div className="flex items-center gap-[1.75rem] text-sm">
        <SideBarLink
          icon={<CommandIcon />}
          link="Commands"
          onClick={() => {
            openModal(ModalEnum.OPEN_COMMAND);
          }}
        />
        <SideBarLink
          icon={<PromptIcon />}
          link="Prompts"
          onClick={() => {
            openModal(ModalEnum.PROMPTS_MODAL);
          }}
        />
        <span className="md:flex hidden">
          <SideBarLink icon={<PersonaIcon />} link="Personas" />
        </span>
        <span className="md:flex hidden">
          <SideBarLink icon={<AddIcon />} link="Add" />
        </span>
      </div>
      <div className="md:flex hidden">
        <p className="text-[#797979] text-xs">32/618</p>
      </div>
    </div>
  );
};

export default PromptFooter;
