import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const { serverId } = params;
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Bad Request Server Id missing", { status: 400 });
    }

    const server = await prisma.server.update({
      where: {
        id: serverId,
        profileId: {
          not: profile?.id,
        },
        Members: { some: { profileId: profile?.id } },
      },
      data: {
        Members: {
          deleteMany: {
            profileId: profile?.id,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log(err, "internal server error");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
