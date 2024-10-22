"use client";
import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import { SendPromptIcon } from "@/assets/svgs/DashboardSvgs";
import { Message, useChatStore } from "@/lib/store/chatStore";
import { scrapWebsiteRefactor } from "@/lib/scrapper";
import { countTokens, stripHtml } from "@/lib/utils";
import useModalStore from "@/lib/store/modalStore";
import { createPortal } from "react-dom";
import { ModalEnum } from "@/constants/modalConstants";
import dynamic from "next/dynamic";
import UpdateMessageModal from "../modals/UpdateMessageModal";
import toast from "react-hot-toast";
import PromptModal from "../modals/PromptModal";
import Loader from "../common/Loader";
import PromptChat from "./PromptChat";
import PromptFooter from "./PromptFooter";

const CommandModal = dynamic(() => import("@/app/modals/CommandModal"), {
  ssr: false,
});
const PromptArea = () => {
  const [currentInput, setCurrentInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const { chatSessions, handleMultiplePrompts, currentSessionId, initializeStore, isLoading, stopLLMResponse } = useChatStore();
  const { modalType, openModal } = useModalStore();
  const [normalizedCommand, setNormalizedCommand] = useState<any>();
  const [messageDetails, setMessageDetails] = useState<Message>();

  useEffect(() => {
    initializeStore();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsStreaming(true);

    e.preventDefault();
    if (currentInput.trim() === "") return;

    // Split multiple prompts by ||
    const userMessages = currentInput.split("||").filter((msg) => msg.trim() !== "");

    // Check token count before sending
    const totalTokens = userMessages.reduce((count, msg) => count + countTokens(msg), 0);
    const maxTokens = 4096 - 100; // Deducting max_new_tokens
    if (totalTokens > maxTokens) {
      toast.error("Input is too long. Please shorten your messages.");
      return;
    }

    if (!currentSessionId) {
      return;
    }

    // Send the multiple prompts to handle in Zustand store
    await handleMultiplePrompts(currentSessionId, userMessages);

    // Clear the input field
    setCurrentInput("");
    setIsStreaming(false);
  };
  // Function to handle changes in the editor
  const handleChange = (value: any) => {
    setCurrentInput(value); // Update the editor content state
  };

  // this is the background worker code to start the website scrapping
  useEffect(() => {
    const handleScraping = async () => {
      const strippedContent = stripHtml(currentInput); // Strip HTML tags first
      const urlRegex = /\[include-url:\s*(https?:\/\/[^\s]+)\s*max_execution_time:\d+\s*filter:\w+\s*store:\w+\]/g;
      const match = urlRegex.exec(strippedContent);
      if (match) {
        const url = match[1]; // Extract the URL
        const content = await scrapWebsiteRefactor(url, false); // Scrape content from the URL
        if (content) {
          // Replace the command in the editor
          const modifiedInput = strippedContent.replace(match[0], content?.content);
          setCurrentInput(modifiedInput); // Update editor content
        }
      }
    };

    // Call the scraping function on content change
    handleScraping();
  }, [currentInput]);

  useEffect(() => {
    if (currentInput !== "") {
      let input = currentInput;
      setCurrentInput(input + " " + normalizedCommand);
    }
  }, [normalizedCommand]);

  // here - I am listening for the command to show the modal prompt
  useEffect(() => {
    if (stripHtml(currentInput) === "/") {
      openModal(ModalEnum.OPEN_COMMAND);
    }
  }, [currentInput]);
  useEffect(() => {
    const chatSessionContainer = document.getElementById("chat-session-container");
    if (chatSessionContainer) {
      chatSessionContainer.scrollTop = chatSessionContainer.scrollHeight;
    }
  }, [chatSessions, currentSessionId]);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="w-full text-primaryWhite 2xl:px-[10rem] h-full flex flex-col justify-end items-end overflow-y-auto px-[1.5rem]">
      <div className="w-full gap-y-[1rem] flex flex-col h-full">
        <PromptChat setMessageDetails={setMessageDetails} />
        <div className="w-full border border-[#2D2D2D] rounded-lg flex max-h-[20rem] items-start hidden-scrollbar justify-between pr-5 py-2">
          <Editor text={currentInput} setText={handleChange} />
          <div className="flex items-center shrink-0 gap-3 py-2">
            <span className="flex items-center text-sm text-[#747474]">⌘↵ Send</span>
            {isStreaming ? (
              <button className="w-8 h-8 bg-white rounded" onClick={() => stopLLMResponse(() => toast.success("generation stopped"))}></button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={stripHtml(currentInput) === ""}>
                {<SendPromptIcon />}
              </button>
            )}
          </div>
        </div>{" "}
        <PromptFooter />
      </div>{" "}
      {modalType === ModalEnum.OPEN_COMMAND && createPortal(<CommandModal setNormalizedCommand={setNormalizedCommand} />, document.getElementById("portals") as HTMLElement)}
      {modalType === ModalEnum.EDIT_PROMPT && createPortal(<UpdateMessageModal messageDetails={messageDetails} />, document.getElementById("portals") as HTMLElement)}
      {modalType === ModalEnum.PROMPTS_MODAL && createPortal(<PromptModal />, document.getElementById("portals") as HTMLElement)}
    </section>
  );
};

export default PromptArea;
