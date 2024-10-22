"use client";
import React from "react";
import { Hearts, RotatingLines, ThreeDots } from "react-loader-spinner";

const LlmLoader = ({ color = "#785D45" }: { color?: any }) => {
  return (
    <div className="w-full h-auto flex flex-col justify-center items-start px-[1.5rem]">
      <ThreeDots visible={true} height="80" width="80" color="#2AABBC" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="" />{" "}
    </div>
  );
};

export default LlmLoader;
