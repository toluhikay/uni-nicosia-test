"use client";
import React, { useState } from "react";
import TabState from "./TabState";

const TopNavTabState = () => {
  const tabDetails = [
    {
      id: 1,
      state: "stream",
      name: "Stream",
      tabComponent: <></>,
    },
    {
      id: 2,
      state: "parallel",
      name: "parallel",
      tabComponent: <></>,
    },
    {
      id: 2,
      state: "sequential",
      name: "sequential",
      tabComponent: <></>,
    },
  ];
  const [swicthTab, setSwitchTab] = useState<string | number>("stream");

  return <TabState tabState={swicthTab} tabArray={tabDetails} setState={setSwitchTab} />;
};

export default TopNavTabState;
