import NavigationSidebar from "@/app/components/Navigation/NavigationSidebar";
import React, { ReactNode } from "react";

const ServerLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex w-full min-h-screen bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-50 text-neutral-900">
        <div className="w-16 h-full hidden md:flex z-30 fixed inset-y-0 border-r dark:border-neutral-700 border-neutral-300 bg-neutral-50 dark:bg-neutral-900">
          <NavigationSidebar />
        </div>
        <div className="pl-16">{children}</div>
      </div>
    </>
  );
};

export default ServerLayout;
