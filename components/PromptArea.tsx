"use client";
import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import { SideBarLink } from "./SideBarTopLinks";
import { AddIcon, CommandIcon, PersonaIcon, PromptIcon } from "@/assets/svgs/DashboardSvgs";
import { useChatStore } from "@/lib/store/chatStore";
import ResponseFormatter from "./ResponseFormatter";
import { scrapWebsiteRefactor } from "@/lib/scrapper";

const PromptArea = () => {
  const countTokens = (text: string) => {
    // This is a simple tokenization based on whitespace
    // In real world - I will opt for something more sophisticated
    return text.split(/\s+/).length;
  };

  const [currentInput, setCurrentInput] = useState(""); // Current input prompt
  const [sessionId, setSessionId] = useState(generateId()); // Session ID
  const { chatSessions, createNewSession, addMessageToSession, handleMultiplePrompts, getChatSession, currentSessionId } = useChatStore();

  console.log(currentSessionId);

  // Effect to check for existing session ID or create a new one - which will be changed later to use the state from the zustand store
  useEffect(() => {
    const existingSession = chatSessions.find((session) => session.id === sessionId);
    if (!existingSession) {
      const newSessionId = generateId(); // Generate a new session ID
      setSessionId(newSessionId); // Set the new session ID in the state
      createNewSession(newSessionId); // Create a new session in the store
    }
  }, [chatSessions, sessionId, createNewSession]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() === "") return;

    // Split multiple prompts by newline or any delimiter
    const userMessages = currentInput.split("||").filter((msg) => msg.trim() !== "");

    // Check token count before sending
    const totalTokens = userMessages.reduce((count, msg) => count + countTokens(msg), 0);
    const maxTokens = 4096 - 100; // Deducting max_new_tokens
    if (totalTokens > maxTokens) {
      alert("Input is too long. Please shorten your messages.");
      return;
    }

    // Send the multiple prompts to handle in Zustand store
    await handleMultiplePrompts(sessionId, userMessages);

    // Clear the input field
    setCurrentInput("");
  };

  // Function to handle changes in the editor
  const handleChange = (value: any) => {
    setCurrentInput(value); // Update the editor content state
  };

  // this is the background worker code to start the website scrapping
  useEffect(() => {
    const handleScraping = async () => {
      console.log("scrapping started");
      const strippedContent = stripHtml(currentInput); // Strip HTML tags first
      const urlRegex = /\[include-url:\s*(https?:\/\/[^\s]+)\s*max_execution_time:\d+\s*filter:\w+\s*store:\w+\]/g;
      const match = urlRegex.exec(strippedContent);
      console.log("match", match);
      if (match) {
        const url = match[1]; // Extract the URL

        const content = await scrapWebsiteRefactor(url, false); // Scrape content from the URL
        console.log("content", content);

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

  // this a function to strip the html tags from the react quill editor
  const stripHtml = (html: any) => {
    // Regular expression to remove HTML tags to be able to implement the / command to display the modal to set the commands
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // here - I am listening for the command to show the modal prompt
  useEffect(() => {
    if (stripHtml(currentInput) === "/") {
      // sample to test the functionality
      alert("toast bar active");

      // TODO - replace the alert with the state action to show the command modal
    }
  }, [currentInput]);

  return (
    <section className="w-full flex-grow text-primaryWhite 2xl:px-[10rem] flex flex-col justify-end items-end overflow-y-auto">
      <p>Layout done</p>
      <h1>LLM Chat</h1>
      {/* Render Chat Messages */}
      <div className="flex-grow overflow-y-auto">
        {chatSessions
          .find((session) => session.id === sessionId)
          ?.messages.map((message) => (
            <div key={message.id} className="my-2">
              <p>
                <strong>User:</strong> {message.userMessage}
              </p>
              <p>
                <strong>LLM:</strong>
                <ResponseFormatter content={message.llmResponse || "Generating..."} /> {/* Using ResponseFormatter */}
              </p>
            </div>
          ))}
      </div>
      <div className="w-full">
        {" "}
        <Editor text={currentInput} setText={handleChange} />
        <button type="button" onClick={handleSubmit}>
          Send
        </button>
        {/* <button onClick={handleScrape}>Scrape URL</button> */}
        <div className="w-full flex items-center justify-between py-2">
          <div className="flex items-center gap-[1.75rem] text-sm">
            <SideBarLink icon={<CommandIcon />} link="Commands" />
            <SideBarLink icon={<PromptIcon />} link="Prompts" />
            <SideBarLink icon={<PersonaIcon />} link="Personas" />
            <SideBarLink icon={<AddIcon />} link="Add" />
          </div>
          <div>
            <p className="text-[#797979] text-xs">32/618</p>
          </div>
        </div>
      </div>{" "}
    </section>
  );
};

// Helper function to generate unique session IDs
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export default PromptArea;
