import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { memberId } = params;
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!memberId) {
      return new NextResponse("Bad Request Member Id missing", { status: 400 });
    }

    if (!serverId) {
      return new NextResponse("Bad Request Server Id missing", { status: 400 });
    }

    const server = await prisma.server.update({
      where: {
        id: serverId,
        profileId: profile?.id,
      },
      data: {
        Members: {
          delete: {
            id: memberId,
            profileId: {
              not: profile?.id,
            },
          },
        },
      },
      include: {
        Members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { memberId } = params;
    const { role } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!memberId) {
      return new NextResponse("Bad Request Member Id missing", { status: 400 });
    }
    if (!serverId) {
      return new NextResponse("Bad Request Server Id missing", { status: 400 });
    }
    const server = await prisma.server.update({
      where: {
        id: serverId,
        profileId: profile?.id,
      },
      data: {
        Members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile?.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        Members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
