import { currentProfile } from "@/lib/current-profile";
import prisma from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await prisma.server.create({
      data: {
        profileId: profile?.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        Channels: {
          create: [
            {
              profileId: profile?.id,
              name: "general",
            },
          ],
        },
        Members: {
          create: [
            {
              profileId: profile?.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    return NextResponse.json({ server });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
