import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const profile = await currentProfile();

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Bad Request Server Id missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Channel Name cannot be 'general'", {
        status: 400,
      });
    }

    const server = await prisma.server.findUnique({
      where: {
        id: serverId as string,
        Members: {
          some: {
            profileId: profile?.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
    });
    if (!server) {
      return new NextResponse("Server not found or access denied", {
        status: 404,
      });
    }

    const updatedServer = await prisma.server.update({
      where: {
        id: serverId as string,
      },
      data: {
        Channels: {
          create: {
            name,
            type,
            profileId: profile?.id,
          },
        },
      },
    });

    return NextResponse.json({ updatedServer });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
