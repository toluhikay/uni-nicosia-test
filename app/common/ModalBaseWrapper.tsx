import React from "react";

const ModalBaseWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 left-0 flex flex-col items-center justify-center h-full w-full">
      <div className="absolute w-full h-full z-[55] bg-black/60 top-0 left-0"></div>
      <div className="z-[99] w-full flex flex-col justify-center items-center">{children}</div>
    </div>
  );
};

export default ModalBaseWrapper;
