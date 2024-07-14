import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "@/lib/prisma";
import { ChannelType, MemberRole } from "@prisma/client";
import ChannelHeader from "./ChannelHeader";
import ServerSearch from "../Server/ServerSearch";
import ServerComp from "../Server/ServerComp";

interface ChannelSidebarProps {
  serverId: string;
}

export const iconMap = {
  [ChannelType.TEXT]: "💬",
  [ChannelType.AUDIO]: "🎤",
  [ChannelType.VIDEO]: "🎞",
};

const roleIconMap = {
  [MemberRole.ADMIN]: "👑",
  [MemberRole.MODERATOR]: "👮",
  [MemberRole.GUEST]: "👤",
};

const ChannelSidebar = async ({ serverId }: ChannelSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
      Members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
    include: {
      Channels: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          profile: true,
        },
      },
      Members: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          profile: true,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  console.log(server, "server");

  const textChannels = server.Channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const voiceChannels = server.Channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const videoChannels = server.Channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server.Members.filter(
    (member) => member.profileId !== profile?.id
  );

  const role = server.Members.find(
    (member) => member.profileId === profile?.id
  )?.role;

  return (
    <div className="h-full w-full">
      <ChannelHeader server={server!!} role={role} />
      <div className="mt-8 flex flex-col gap-2 w-full p-2">
        <ServerSearch
          data={[
            {
              label: "Text Channels",
              type: "channel",
              data: textChannels?.map((channel) => ({
                id: channel?.id,
                name: channel?.name,
                icon: iconMap[channel?.type],
              })),
            },
            {
              label: "Voice Channels",
              type: "channel",
              data: voiceChannels?.map((channel) => ({
                id: channel?.id,
                name: channel?.name,
                icon: iconMap[channel?.type],
              })),
            },
            {
              label: "Video Channels",
              type: "channel",
              data: videoChannels?.map((channel) => ({
                id: channel?.id,
                name: channel?.name,
                icon: iconMap[channel?.type],
              })),
            },
            {
              label: "Members",
              type: "member",
              data: members?.map((member) => ({
                id: member?.id,
                name: member?.profile?.name,
                icon: roleIconMap[member?.role],
              })),
            },
          ]}
        />
        <ServerComp
          server={server}
          role={role}
          label="TEXT CHANNELS"
          channelList={textChannels}
          channelType={ChannelType.TEXT}
          sectionType="channel"
        />

        <ServerComp
          server={server}
          role={role}
          label="VOICE CHANNELS"
          channelType={ChannelType.AUDIO}
          channelList={voiceChannels}
          sectionType="channel"
        />
        <ServerComp
          server={server}
          role={role}
          label="VIDEO CHANNELS"
          channelType={ChannelType.VIDEO}
          channelList={videoChannels}
          sectionType="channel"
        />

        <ServerComp
          server={server}
          label="MEMBERS"
          sectionType="member"
          members={members}
        />
      </div>
    </div>
  );
};

export default ChannelSidebar;
