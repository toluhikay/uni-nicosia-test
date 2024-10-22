"use client";
import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = ({ color = "#785D45" }: { color?: any }) => {
  return (
    <div className="w-full h-full bg-primaryBlack flex flex-col justify-center items-center px-[1.5rem]">
      <ThreeDots visible={true} height="80" width="80" color="#2AABBC" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="" />{" "}
    </div>
  );
};

export default Loader;
