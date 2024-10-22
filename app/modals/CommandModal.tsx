"use client";
import React, { useState } from "react";
import ModalBaseWrapper from "../common/ModalBaseWrapper";
import { SideBarLink } from "../components/SideBarTopLinks";
import { AttachmentIcon, CloseIcon, CommandIcon } from "@/assets/svgs/DashboardSvgs";
import useModalStore from "@/lib/store/modalStore";

const CommandModal = ({ setNormalizedCommand }: { setNormalizedCommand: React.Dispatch<React.SetStateAction<any>> }) => {
  const { closeModal } = useModalStore();

  const [advanced, setAdvanced] = useState(false);
  const [commands, setCommands] = useState({ include_url: "", maxTime: 300, filter: false, store: false });

  return (
    <ModalBaseWrapper>
      <div className="bg-[#202020] rounded-lg w-[34rem] max-w-[90%]">
        <div className="w-full flex items-center justify-between px-2 text-white">
          <SideBarLink icon={<CommandIcon />} link="Command" />
          <span
            className="cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          >
            <CloseIcon />
          </span>{" "}
        </div>
        <div className="relative w-full p-4 border-t border-gray-700">
          {!advanced ? (
            <div className="bg-[#121212] text-white transition-all rounded-lg p-5 flex flex-col gap-[1.125rem]">
              <div className="flex items-center gap-2">
                <AttachmentIcon />
                <p>Include url</p>
              </div>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  className="bg-inherit outline-none w-[50%]"
                  value={commands.include_url}
                  onChange={(e) => {
                    setCommands({ ...commands, include_url: e.target.value });
                  }}
                  placeholder="Enter URL"
                />
                <div className="flex items-center gap-3">
                  <button
                    className="border border-[#333333] rounded-lg p-[.625rem] text-[#E4E4E4] text-sm font-medium"
                    onClick={() => {
                      setAdvanced(true);
                    }}
                  >
                    Advanced
                  </button>
                  <button
                    className="border border-[#333333] bg-[#333333] rounded-lg p-[.625rem] text-[#E4E4E4] text-sm font-medium"
                    onClick={() => {
                      setNormalizedCommand(`[include-url: ${commands.include_url} max_execution_time:${commands.maxTime} filter:${commands.filter} store:${commands.store}]`);
                      closeModal();
                    }}
                  >
                    Insert
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="transition-all w-full p-5 bg-[#121212] rounded-lg text-gray-400 flex flex-col gap-3">
              <select
                className="w-full bg-inherit outline-none text-gray-400"
                name=""
                id=""
                onChange={(e) => {
                  setCommands({ ...commands, maxTime: Number(e.target.value) });
                }}
              >
                <option value="">Select Max Execution Time</option>
                <option value="300">300</option>
                <option value="750">750</option>
                <option value="1000">1000</option>
              </select>{" "}
              <div className="flex flex-wrap text-gray-400">
                <p className="w-full">Filter</p>
                <input
                  type="radio"
                  name="filter"
                  value={"true"}
                  onChange={(e) => {
                    setCommands({ ...commands, filter: Boolean(e.target.value) });
                  }}
                />{" "}
                <label htmlFor="" className="mr-3">
                  Yes
                </label>
                <input
                  type="radio"
                  name="filter"
                  value={"false"}
                  onChange={(e) => {
                    setCommands({ ...commands, filter: Boolean(e.target.value) });
                  }}
                />{" "}
                <label htmlFor="">No</label>
              </div>
              <div className="flex flex-wrap text-gray-400">
                <p className="w-full">Store</p>
                <input
                  type="radio"
                  name="store"
                  value={"true"}
                  onChange={(e) => {
                    setCommands({ ...commands, store: Boolean(e.target.value) });
                  }}
                />{" "}
                <label htmlFor="" className="mr-3">
                  Yes
                </label>
                <input
                  type="radio"
                  name="store"
                  value={"false"}
                  onChange={(e) => {
                    setCommands({ ...commands, store: Boolean(e.target.value) });
                  }}
                />{" "}
                <label htmlFor="">No</label>
              </div>{" "}
              <button
                className="border border-[#333333] bg-[#333333] rounded-lg p-[.625rem] text-[#E4E4E4] text-sm font-medium"
                onClick={() => {
                  setAdvanced(false);
                }}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalBaseWrapper>
  );
};

export default CommandModal;
