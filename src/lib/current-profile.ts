import { auth } from "@clerk/nextjs/server";
import prisma from "./prisma";
import { redirect } from "next/navigation";

export const currentProfile = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const profile = await prisma.profile?.findUnique({
    where: {
      userId,
    },
  });
  return profile;
};
