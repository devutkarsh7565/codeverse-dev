"use client";
import { useEffect, useState } from "react";
import CreateServerModal from "../modals/CreateServerModal";
import InviteMemberModal from "../modals/InviteMemberModal";
import { useModalStore } from "@/hooks/useModalStore";
import EditServerModal from "../modals/EditServerModal";
import MembersModal from "../modals/MembersModal";
import CreateChannelModal from "../modals/CreateChannelModal";
import LeaveServerModal from "../modals/LeaveServerModal";
import DeleteServerModal from "../modals/DeleteServerModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { type } = useModalStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (type === "createServer") {
    return <CreateServerModal />;
  }
  if (type === "invite") {
    return <InviteMemberModal />;
  }

  if (type === "editServer") {
    return <EditServerModal />;
  }

  if (type === "members") {
    return <MembersModal />;
  }

  if (type === "createChannel") {
    return <CreateChannelModal />;
  }

  if (type === "leaveServer") {
    return <LeaveServerModal />;
  }

  if (type === "deleteServer") {
    return <DeleteServerModal />;
  }
  return null;
};
