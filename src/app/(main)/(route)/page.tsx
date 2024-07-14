import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { initialProfile } from "../../../lib/initial-profile";
import prisma from "../../../lib/prisma";
import { redirect } from "next/navigation";
import InitialModal from "@/app/components/modals/CreateServerModal";
import { Button } from "flowbite-react";
import HomePage from "@/app/components/HomePage/HomePage";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <CrudShowcase />
    </main>
  );
}

async function CrudShowcase() {
  const profile = await initialProfile();

  const server = await prisma.server.findFirst({
    where: {
      Members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/server/${server.id}`);
  }
  return (
    <div className="w-full max-w-xs">
      <UserButton afterSwitchSessionUrl="/sign-up" />
      <HomePage />
    </div>
  );
}
