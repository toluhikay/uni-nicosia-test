import React from "react";

const ModalWraper = ({ children, title }: { children: React.ReactNode; title?: string }) => {
  return <div className="bg-white w-fit max-h-[90%] h-auto overflow-y-auto relative flex flex-col gap-6 p-5 rounded-2xl">{children}</div>;
};

export default ModalWraper;
