import { ChatSession, Message, useChatStore } from "@/lib/store/chatStore";
import React from "react";
import PromptDefaultMessage from "./PromptDefaultMessage";
import { stripHtml } from "@/lib/utils";
import { CommitTreeIcon, CopyIcon, DownloadIcon, EditIcon } from "@/assets/svgs/DashboardSvgs";
import ResponseFormatter from "./ResponseFormatter";
import LlmLoader from "../common/LlmLoader";
import useModalStore from "@/lib/store/modalStore";
import { ModalEnum } from "@/constants/modalConstants";

const PromptChat = ({ setMessageDetails }: { setMessageDetails: React.Dispatch<React.SetStateAction<Message | undefined>> }) => {
  const { chatSessions, currentSessionId } = useChatStore();
  const { openModal } = useModalStore();

  return (
    <div className="h-[85%] overflow-auto py-3 hidden-scrollbar scroll-smooth" id="chat-session-container">
      {chatSessions
        .filter((e) => e.id === currentSessionId)
        .map((chats, index) => {
          return chats.messages.length < 1 ? (
            <div className="h-full flex justify-center flex-col" key={index}>
              <PromptDefaultMessage />
            </div>
          ) : (
            <div className="flex flex-col gap-2" key={index}>
              {chats.messages.map((message, messageIndex) => {
                return (
                  <div className="w-full flex flex-col gpa-y-2" key={messageIndex}>
                    <div className="w-full flex justify-end items-center gap-1">
                      <div className="bg-[#202020] w-fit rounded flex items-center p-3 gap-6">
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            setMessageDetails(message);
                            openModal(ModalEnum.EDIT_PROMPT);
                          }}
                        >
                          <EditIcon />
                        </span>
                      </div>
                      <div className="bg-[#202020] p-[1.75rem] w-fit lg:max-w-[60%] rounded-[.75rem]">
                        <p className="text-[#E4E4E4] font-medium first-letter:capitalize">{stripHtml(message.userMessage)}</p>
                      </div>{" "}
                    </div>
                    <div>
                      {message.llmResponse ? (
                        <span className="w-full">
                          <ResponseFormatter content={message.llmResponse} />
                          <div className="bg-[#202020] w-fit rounded flex items-center p-3 gap-6">
                            <span className="cursor-pointer">
                              <CopyIcon />
                            </span>
                            <span className="cursor-pointer">
                              <DownloadIcon />
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={() => {
                                setMessageDetails(message);
                                openModal(ModalEnum.EDIT_PROMPT);
                              }}
                            >
                              <EditIcon />
                            </span>
                          </div>
                        </span>
                      ) : message.llmStopped ? (
                        <p>You stopped the generation</p>
                      ) : message.loading ? (
                        <LlmLoader />
                      ) : null}
                    </div>
                    {message.llmResponse === "" && <p className="text-xs text-red-600">You stopped UNIC AI from completing this response.</p>}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default PromptChat;
