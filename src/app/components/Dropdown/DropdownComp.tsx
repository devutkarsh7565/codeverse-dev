"use client";
import { useModalStore } from "@/hooks/useModalStore";
import { ServerWithMemberAndProfile } from "@/types";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  PencilIcon,
  PlusIcon,
  Square2StackIcon,
  TrashIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import { Server } from "@prisma/client";

interface DropdownCompProps {
  isAdmin: boolean;
  isModerator: boolean;
  server: ServerWithMemberAndProfile;
}

export default function DropdownComp({
  isAdmin,
  isModerator,
  server,
}: DropdownCompProps) {
  const { onOpen } = useModalStore();
  return (
    <div className="fixed flex justify-center top-0 w-60 text-right">
      <Menu as="div">
        <MenuButton className="inline-flex py border-b justify-between border-r-2 border-neutral-300 dark:border-neutral-700 w-60 items-center gap-2 dark:bg-neutral-800 bg-neutral-200 py-1.5 px-3 text-sm/6 font-semibold text-neutral-900 dark:text-neutral-100 shadow-inner shadow-white/10 focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white">
          <div className="text-sm font-normal">
            {" "}
            {server.name?.length > 15
              ? server.name?.substring(0, 15) + "..."
              : server.name}
          </div>
          <ChevronDownIcon className="size-4 " />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-60 z-30  border border-neutral-300 dark:border-neutral-900 bg-neutral-300 dark:bg-neutral-900 p-1 text-sm/6 text-black dark:text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {isModerator && (
            <MenuItem>
              <button
                onClick={() => onOpen("invite", { server })}
                className="group flex justify-between border-b border-neutral-400 dark:border-neutral-600 w-full items-center gap-2 py-1.5 px-3 data-[focus]:bg-white/10"
              >
                Invite Code
                <UserPlusIcon className="w-4 h-4" />
              </button>
            </MenuItem>
          )}
          {isAdmin && (
            <MenuItem>
              <button
                onClick={() => onOpen("editServer", { server })}
                className="group flex w-full justify-between border-b border-neutral-400 dark:border-neutral-600  items-center gap-2 py-1.5 px-3 data-[focus]:bg-white/10"
              >
                Server Settings
                <Cog8ToothIcon className="w-4 h-4" />
              </button>
            </MenuItem>
          )}
          {isAdmin && (
            <MenuItem>
              <button
                onClick={() => onOpen("members", { server })}
                className="group flex w-full border-b border-neutral-400 dark:border-neutral-600 justify-between  items-center gap-2 py-1.5 px-3 data-[focus]:bg-white/10"
              >
                Manage Members
                <UsersIcon className="w-4 h-4" />
              </button>
            </MenuItem>
          )}
          {isAdmin && (
            <MenuItem>
              <button
                onClick={() => onOpen("createChannel", { server })}
                className="group flex w-full border-b border-neutral-400 dark:border-neutral-600 justify-between  items-center gap-2 py-1.5 px-3 data-[focus]:bg-white/10"
              >
                Create Channel
                <PlusIcon className="w-4 h-4" />
              </button>
            </MenuItem>
          )}
          {/* {isModerator && (
            <div className="w-full h-[1px] border-b border-neutral-400 dark:border-neutral-600"></div>
          )} */}
          {isAdmin && (
            <MenuItem>
              <button
                onClick={() => onOpen("deleteServer", { server })}
                className="group text-rose-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex w-full border-b border-neutral-400 dark:border-neutral-600 justify-between  items-center gap-2 py-1.5 px-3 data-[focus]:bg-white/10"
              >
                Delete Server
                <TrashIcon className="w-4 h-4" />
              </button>
            </MenuItem>
          )}

          {!isAdmin && (
            <MenuItem>
              <button
                onClick={() => onOpen("leaveServer", { server })}
                className="group text-rose-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex w-full border-b border-neutral-400 dark:border-neutral-600 justify-between  items-center gap-2 py-1.5 px-3 data-[focus]:bg-white/10"
              >
                Leave Server
                <TrashIcon className="w-4 h-4" />
              </button>
            </MenuItem>
          )}
        </MenuItems>
      </Menu>
    </div>
  );
}
