"use client";
import React from "react";
import TooltipComponent from "../Tooltip/Tooltip";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useModalStore } from "@/hooks/useModalStore";

const CreateServerButton = () => {
  const { onOpen } = useModalStore();
  return (
    <TooltipComponent content="Create Server" placement="right">
      <button
        onClick={() => {
          onOpen("createServer");
          console.log("not server created");
        }}
        className="group"
      >
        <div className="group-hover:rounded-lg rounded-full p-2 transition-all   duration-300  bg-pink-600/30 group-hover:bg-pink-600 text-pink-600 group-hover:text-neutral-100">
          <PlusIcon className="w-6 h-6" />
        </div>
      </button>
    </TooltipComponent>
  );
};

export default CreateServerButton;
