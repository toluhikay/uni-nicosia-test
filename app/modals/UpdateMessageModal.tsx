"use client";
import React, { useEffect, useState } from "react";
import ModalBaseWrapper from "../common/ModalBaseWrapper";
import Editor from "../components/Editor";
import { Message, useChatStore } from "@/lib/store/chatStore";
import { CloseIcon, SendPromptIcon } from "@/assets/svgs/DashboardSvgs";
import useModalStore from "@/lib/store/modalStore";
import toast from "react-hot-toast";

const UpdateMessageModal = ({ messageDetails }: { messageDetails: Message | undefined }) => {
  const { currentSessionId, updateMessageAndCallLLM, createNewSession } = useChatStore();
  const { closeModal } = useModalStore();

  const [currentInput, setCurrentInput] = useState("");

  useEffect(() => {
    if (messageDetails) {
      setCurrentInput(messageDetails?.userMessage);
    }
  }, []);

  const handleChange = (value: string) => {
    setCurrentInput(value);
  };
  return (
    <ModalBaseWrapper>
      <div className="flex flex-col gap-3 bg-primary py-2 justify-center items-center rounded w-fit max-w-[90%]">
        <div className="w-[40rem] flex justify-between items-center text-white max-w-[95%]">
          <p>Edit Message</p>
          <span
            className="cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          >
            <CloseIcon />
          </span>{" "}
        </div>
        <div className="w-[40rem] max-w-[95%] border border-[#2D2D2D] bg-black rounded-lg flex items-center justify-between ">
          <Editor text={currentInput} setText={handleChange} />
          <div className="flex items-center shrink-0 gap-3 p-3">
            <span className="flex items-center text-sm text-[#747474]">⌘↵ Send</span>
            <button
              type="button"
              onClick={() => {
                if (currentSessionId && messageDetails?.id) {
                  updateMessageAndCallLLM(currentSessionId, messageDetails?.id, currentInput);
                  closeModal();
                } else {
                  toast.error("no session detected, let me create one asap");
                  createNewSession();
                  closeModal();
                }
              }}
            >
              <SendPromptIcon />
            </button>
          </div>
        </div>{" "}
      </div>
    </ModalBaseWrapper>
  );
};

export default UpdateMessageModal;
