"use client";
import React, { useState } from "react";
import { useModalStore } from "@/hooks/useModalStore";
import ModalComp from "./ModalComp";
import {
  ArrowPathIcon,
  CheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/16/solid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TooltipComponent from "../Tooltip/Tooltip";
import { useOrigin } from "@/hooks/useOrigin";
import axios from "axios";

const InviteMemberModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModalStore();
  const [copyToClipboard, setCopyToClipboard] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const origin = useOrigin();
  const isModalOpen = isOpen && type === "invite";

  const inviteCode = `${origin}/invite/${data?.server?.inviteCode}`;

  const handleCopy = () => {
    setCopyToClipboard(true);
    setInterval(function () {
      setCopyToClipboard(false);
    }, 3000);
  };

  const handleGenerateNewLink = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${data?.server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ModalComp isOpen={isModalOpen} onClose={onClose}>
        <div className="flex w-full flex-col  items-center gap-6">
          <h1 className="text-2xl font-medium">Invite Friends</h1>
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex items-end gap-4">
              <div className="w-[90%] flex flex-col gap-1">
                <label
                  className="text-xs upppercase font-medium text-neutral-600"
                  htmlFor=""
                >
                  Server Invite Link
                </label>
                <input
                  disabled={isLoading}
                  placeholder="Invite Code"
                  value={inviteCode}
                  className="w-full h-8 flex bg-neutral-100 rounded-md items-center text-sm px-3 hover:border-neutral-300 dark:hover:border-neutral-700 duration border border-transparent outline-none"
                />
              </div>

              <TooltipComponent content="Copy Link">
                <CopyToClipboard onCopy={() => handleCopy()} text={inviteCode}>
                  <button disabled={isLoading}>
                    {copyToClipboard ? (
                      <CheckIcon className="text-green-500 cursor-pointer w-5 h-5 mb-1" />
                    ) : (
                      <ClipboardDocumentIcon className="text-neutral-500 cursor-pointer w-6 h-6" />
                    )}
                  </button>
                </CopyToClipboard>
              </TooltipComponent>
            </div>
            <button
              onClick={handleGenerateNewLink}
              disabled={isLoading}
              className=" flex items-center gap-3 text-neutral-500"
            >
              <div className="text-x cursor-pointer font-medium">
                Generate a new Link
              </div>
              <ArrowPathIcon className="w-4 h-4 " />
            </button>
          </div>
        </div>
      </ModalComp>
    </>
  );
};

export default InviteMemberModal;
