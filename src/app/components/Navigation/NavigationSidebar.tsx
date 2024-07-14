import React from "react";
import { currentProfile } from "@/lib/current-profile";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import NavigationItem from "./NavigationItem";
import { UserButton } from "@clerk/nextjs";
import { DarkMode } from "@/app/components/DarkMode/DarkMode";
import CreateServerButton from "./CreateServerButton";

const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const servers = await prisma.server.findMany({
    where: {
      Members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });
  return (
    <div className="w-full relative h-full flex-col flex items-center gap-4 py-7">
      <CreateServerButton />
      <Seperater />

      <div className="mt-3">
        {servers?.map((server, index) => (
          <div key={index} className="mb-6 flex flex-col justify-start w-full">
            <NavigationItem
              name={server.name}
              imageUrl={server.imageUrl}
              id={server.id}
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-7 flex flex-col items-center">
        <DarkMode />
        <UserButton
          afterSwitchSessionUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[40px] w-[40px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;

const Seperater = () => {
  return (
    <div className="w-3/4 h-[2px] bg-neutral-300 dark:bg-neutral-700"></div>
  );
};
