"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChannelType, MemberRole } from "@prisma/client";
import React, { useState } from "react";
import SearchChannelAndMemberModal from "../modals/SearchChannelAndMemberModal";

export interface ServerSearchProps {
  data: {
    label: string;
    type: "member" | "channel";
    data: {
      icon: React.ReactNode;
      name: string;
      id: string;
    }[];
  }[];
}

const ServerSearch = ({ data }: ServerSearchProps) => {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <>
      <button
        onClick={open}
        className="w-full border border-neutral-300 dark:border-neutral-600 px-3 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:border-neutral-200 duration-300 rounded-lg text-sm flex justify-between items-center text-neutral-600 dark:text-neutral-300"
      >
        <h1>Search</h1>
        <MagnifyingGlassIcon className="w-4 h-4" />
      </button>
      <SearchChannelAndMemberModal isOpen={isOpen} close={close} data={data} />
    </>
  );
};

export default ServerSearch;
