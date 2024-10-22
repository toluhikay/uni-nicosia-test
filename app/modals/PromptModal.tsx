"use client";
import React, { useState } from "react";
import ModalBaseWrapper from "../common/ModalBaseWrapper";
import { SideBarLink } from "../components/SideBarTopLinks";
import { CloseIcon, CommandIcon, PromptIcon } from "@/assets/svgs/DashboardSvgs";
import useModalStore from "@/lib/store/modalStore";
import { useChatStore } from "@/lib/store/chatStore";
import { stripHtml } from "@/lib/utils";

const PromptModal = () => {
  const { closeModal } = useModalStore();
  const { chatSessions, setCurrentSessionId } = useChatStore();

  return (
    <ModalBaseWrapper>
      <div className="bg-[#202020] rounded-lg w-[34rem] overflow-hidden max-w-[90%]">
        <div className="w-full flex items-center justify-between px-2 text-white">
          <SideBarLink icon={<PromptIcon />} link="Prompts" />
          <span
            className="cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          >
            <CloseIcon />
          </span>{" "}
        </div>
        <div className="h-[20rem] w-full overflow-y-auto hidden-scrollbar bg-gray-400 flex flex-col p-2 gap-1">
          {chatSessions.map((session, index) => {
            return (
              <p
                className="w-full bg-gray-800 p-2 rounded first-letter:capitalize cursor-pointer text-white hover:bg-primary"
                key={session.id}
                onClick={() => {
                  setCurrentSessionId(session.id);
                  closeModal();
                }}
              >
                {stripHtml(session?.messages?.[0]?.userMessage || "Hey How Can I help You")}
              </p>
            );
          })}
        </div>
      </div>
    </ModalBaseWrapper>
  );
};

export default PromptModal;
