import { ServerWithMemberAndProfile } from "@/types";
import { MemberRole } from "@prisma/client";
import { Dropdown } from "flowbite-react";
import React from "react";
import DropdownComp from "../Dropdown/DropdownComp";
import { UserPlusIcon } from "@heroicons/react/16/solid";

interface ChannelHeaderProps {
  server: ServerWithMemberAndProfile;
  role?: MemberRole;
}

const ChannelHeader = ({ server, role }: ChannelHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  const isGuest = role === MemberRole.GUEST;

  const array: { menuItemName: string; icon: React.ReactNode }[] = [
    {
      menuItemName: "Invite People",
      icon: <UserPlusIcon className="w-5 h-5" />,
    },
    {
      menuItemName: "Invite People",
      icon: <UserPlusIcon className="w-5 h-5" />,
    },
  ];
  return (
    <div className=" w-full">
      <DropdownComp
        isAdmin={isAdmin}
        isModerator={isModerator}
        server={server}
      />
    </div>
  );
};

export default ChannelHeader;
