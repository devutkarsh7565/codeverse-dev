"use client";
import { ServerWithMemberAndProfile } from "@/types";
import {
  Channel,
  ChannelType,
  Member,
  MemberRole,
  Profile,
} from "@prisma/client";
import React from "react";
import TooltipComponent from "../Tooltip/Tooltip";
import {
  Cog6ToothIcon,
  HashtagIcon,
  LockClosedIcon,
  MicrophoneIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useModalStore } from "@/hooks/useModalStore";

interface IServerComp {
  server: ServerWithMemberAndProfile;
  role?: MemberRole;
  sectionType?: "member" | "channel";
  channelList?: Channel[];
  label: string;
  channelType?: ChannelType;
  members?: (Member & { profile: Profile })[];
}

const ServerComp = ({
  server,
  role,
  label,
  sectionType,
  channelList,
  channelType,
  members,
}: IServerComp) => {
  const { onOpen } = useModalStore();

  return (
    <div className="w-full flex flex-col ">
      <div className="flex items-center justify-between w-full px-2 text-neutral-700 dark:text-neutral-400">
        <h1 className="text-xs tracking-wide font-medium">{label}</h1>
        {role !== MemberRole.GUEST && sectionType === "channel" && (
          <TooltipComponent content="Create Channel">
            <button
              onClick={() => onOpen("createChannel", { server })}
              className="p-1 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-700 duration-300"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </TooltipComponent>
        )}
        {sectionType === "member" && (
          <TooltipComponent content="Add Members">
            <button
              onClick={() => onOpen("members", { server })}
              className="p-1 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-700 duration-300"
            >
              <Cog6ToothIcon className="w-4 h-4" />
            </button>
          </TooltipComponent>
        )}
      </div>

      <div className="flex flex-col gap-0 w-full">
        {channelList?.map((channel) => (
          <button
            key={channel.id}
            className="flex items-center group rounded-md py-2 hover:bg-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-50 dark:hover:bg-neutral-900/40 duration-300  justify-between w-full px-2 text-neutral-700 dark:text-neutral-400"
          >
            <div className="flex items-center gap-2">
              {channelType === ChannelType.TEXT ? (
                <HashtagIcon className="w-4 h-4" />
              ) : channelType === ChannelType.AUDIO ? (
                <MicrophoneIcon className="w-4 h-4" />
              ) : (
                <VideoCameraIcon className="w-4 h-4" />
              )}
              <h1 className="text-xs tracking-wide font-medium">
                {channel.name}
              </h1>
            </div>
            {channel?.name !== "general" && role !== MemberRole.GUEST && (
              <div className="flex items-center gap-1 ">
                <TooltipComponent content="Edit">
                  <PencilSquareIcon className="w-4 h-4 group-hover:block hidden duration-300" />
                </TooltipComponent>
                <TooltipComponent content="Delete">
                  <TrashIcon className="w-4 h-4 group-hover:block hidden duration-300" />
                </TooltipComponent>
              </div>
            )}
            {channel?.name === "general" && (
              <LockClosedIcon className="w-4 h-4" />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-0 w-full">
        {members?.map((member) => (
          <button
            key={member?.profile?.id}
            className="flex items-center group rounded-md py-2 hover:bg-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-50 dark:hover:bg-neutral-900/40 duration-300  justify-between w-full px-2 text-neutral-700 dark:text-neutral-400"
          >
            <div className="flex items-center gap-2">
              {channelType === ChannelType.TEXT ? (
                <HashtagIcon className="w-4 h-4" />
              ) : channelType === ChannelType.AUDIO ? (
                <MicrophoneIcon className="w-4 h-4" />
              ) : (
                <VideoCameraIcon className="w-4 h-4" />
              )}
              <h1 className="text-xs tracking-wide font-medium">
                {member?.profile?.name}
              </h1>
            </div>
            {/* {?.name !== "general" && role !== MemberRole.GUEST && (
              <div className="flex items-center gap-1 ">
                <TooltipComponent content="Edit">
                  <PencilSquareIcon className="w-4 h-4 group-hover:block hidden duration-300" />
                </TooltipComponent>
                <TooltipComponent content="Delete">
                  <TrashIcon className="w-4 h-4 group-hover:block hidden duration-300" />
                </TooltipComponent>
              </div>
            )} */}
            {/* {channel?.name === "general" && (
              <LockClosedIcon className="w-4 h-4" />
            )} */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServerComp;
