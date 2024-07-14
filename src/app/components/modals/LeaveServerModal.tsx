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
import { useRouter } from "next/navigation";

const LeaveServerModal = () => {
  const router = useRouter();
  const { onOpen, isOpen, onClose, type, data } = useModalStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isModalOpen = isOpen && type === "leaveServer";

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${data?.server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ModalComp isOpen={isModalOpen} onClose={onClose}>
        <div className="flex w-full flex-col  items-center gap-6 text-neutral-900 dark:text-neutral-50">
          <div className="flex flex-col gap-3 w-full items-center">
            <h1 className="text-2xl font-medium">Leave Server</h1>
            <p className="text-neutral-500 text-sm dark:text-neutral-300">
              Are you sure you want to leave the{" "}
              <span className="dark:text-pink-600 tracking-wide font-medium text-pink-500 dark:hover:text-pink-500 hover:text-pink-600">
                {data?.server?.name}
              </span>{" "}
              server ?
            </p>
          </div>

          <div className="flex items-center justify-between w-full">
            <button disabled={isLoading} onClick={() => onClose()}>
              Cancel
            </button>
            <button
              onClick={onClick}
              disabled={isLoading}
              className="dark:bg-pink-600 tracking-wide font-medium bg-pink-500 dark:hover:bg-pink-500 hover:bg-pink-600 duration-300 text-sm text-white rounded-md py-2 px-4"
            >
              Confirm
            </button>
          </div>
        </div>
      </ModalComp>
    </>
  );
};

export default LeaveServerModal;
