import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "@/lib/prisma";

interface InviteCodeProps {
  params: {
    inviteCode: string;
  };
}
const InviteCode = async ({ params }: InviteCodeProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/sign-in");
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingServer = await prisma.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      Members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/server/${existingServer.id}`);
  }

  // Find the server by inviteCode
  const serverToUpdate = await prisma.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
    },
  });

  if (!serverToUpdate) {
    return redirect("/"); // or handle this case appropriately
  }

  // Update the server using its unique id
  const updatedServer = await prisma.server.update({
    where: {
      id: serverToUpdate.id,
    },
    data: {
      Members: {
        create: [
          {
            profileId: profile?.id,
          },
        ],
      },
    },
  });

  if (updatedServer) {
    return redirect(`/server/${updatedServer.id}`);
  }

  return null;
};

export default InviteCode;
