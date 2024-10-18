"use client";
import { getIneference } from "@/lib/huggingFaceLLLM/huggingFaceServerless";
import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import { SideBarLink } from "./SideBarTopLinks";
import { AddIcon, CommandIcon, PersonaIcon, PromptIcon } from "@/assets/svgs/DashboardSvgs";

const PromptArea = () => {
  const [text, setText] = useState();

  const stripHtml = (html: any) => {
    // Regular expression to remove HTML tags
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    if (stripHtml(text) === "/") {
      alert("toast bar active");
    }
  }, [text]);

  // console.log(text);

  return (
    <section className="w-full flex-grow text-primaryWhite 2xl:px-[10rem] flex flex-col justify-end items-end overflow-y-auto">
      <p>Layout done</p>
      <div className="w-full">
        {" "}
        <Editor text={text} setText={setText} />
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

export default PromptArea;
