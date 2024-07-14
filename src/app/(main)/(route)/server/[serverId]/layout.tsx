import { currentProfile } from "@/lib/current-profile";
import React from "react";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ChannelSidebar from "@/app/components/ChannelSidebar/ChannelSidebar";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/sign-in");
  }

  const server = await prisma.server.findUnique({
    where: {
      id: params.serverId,
      Members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }
  return (
    <>
      <div className="h-full w-full ">
        <div className="md:flex hidden h-full flex-col border-r-2 border-neutral-300 dark:border-neutral-700 fixed w-60 bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-50 text-neutral-900">
          <ChannelSidebar serverId={params.serverId} />
        </div>
        <div className="h-full w-full md:pl-60">{children}</div>
      </div>
    </>
  );
};

export default Layout;
