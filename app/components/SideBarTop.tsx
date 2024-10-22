"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/assets/images/UNIC-Horizontal.png";
import SideBarTopLinks from "./SideBarTopLinks";
import { useChatStore } from "@/lib/store/chatStore";

const SideBarTop = ({ setModalOpen }: { setModalOpen?: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { createNewSession, chatSessions, setCurrentSessionId } = useChatStore();
  return (
    <div className="w-full flex flex-col gap-y-[1rem] max-h-[60%]">
      <div className="w-full flex flex-col gap-y-[.5rem]">
        <Image className="w-[5rem] cursor-pointer h-auto" src={Logo.src} width={200} height={200} alt="UNIC Logo" />
        <button
          className="w-full bg-primary p-4 rounded-full flex items-start text-primaryBlack font-semibold"
          onClick={() => {
            if (chatSessions[chatSessions.length - 1].messages.length < 1) {
              setCurrentSessionId(chatSessions[chatSessions.length - 1].id);
              setModalOpen && setModalOpen(false);

              return;
            }
            createNewSession();
            setModalOpen && setModalOpen(false);
          }}
        >
          + New Chat
        </button>
      </div>{" "}
      <SideBarTopLinks />
    </div>
  );
};

export default SideBarTop;
