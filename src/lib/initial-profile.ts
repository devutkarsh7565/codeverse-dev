import { currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";

export const initialProfile = async () => {
  const user = await currentUser();
  if (!user) {
    console.log("no user");
    return null;
  }
  const profile = await prisma.profile?.findUnique({
    where: {
      userId: user.id,
    },
  });
  console.log("find Unique", user.fullName);

  if (profile) {
    return profile;
  }

  const newProfile = await prisma.profile?.create({
    data: {
      userId: user.id,
      name: user.fullName ?? "hello",
      email: user.emailAddresses[0]?.emailAddress ?? "email",
      imageUrl: user.imageUrl,
    },
  });

  console.log("newProfile", newProfile?.email, "userFound");
  return newProfile;
};
