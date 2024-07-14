import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import React from "react";
import prisma from "@/lib/prisma";
import DropdownComp from "@/app/components/Dropdown/DropdownComp";

const Server = async () => {
  return <div>Server</div>;
};

export default Server;
