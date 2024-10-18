import Header from "@/components/Header";
import PromptArea from "@/components/PromptArea";
import SideBar from "@/components/SideBar";
import TopNav from "@/components/TopNav";
import React from "react";

const DashboardPage = () => {
  return (
    <main className="flex w-full h-full overflow-hidden bg-primaryBlack">
      <SideBar />
      <div className="w-full h-full flex flex-col overflow-hidden">
        <Header />
        <TopNav />
        <PromptArea />{" "}
      </div>
    </main>
  );
};

export default DashboardPage;
