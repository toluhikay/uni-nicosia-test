"use client";
import Header from "@/app/components/Header";
import PromptArea from "@/app/components/PromptArea";
import SideBar from "@/app/components/SideBar";
import TopNav from "@/app/components/TopNav";
import React, { useState } from "react";
import withAuth from "../components/withAuth";

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

export default withAuth(DashboardPage);
