"use client";
import React, { useEffect, useState } from "react";
import { useModalStore } from "@/hooks/useModalStore";
import ModalComp from "./ModalComp";
import { ServerWithMemberAndProfile } from "@/types";
import { Avatar } from "flowbite-react";
import {
  ArrowPathIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon, EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import axios from "axios";
import { MemberRole } from "@prisma/client";
import qs from "query-string";
import { useRouter } from "next/navigation";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheckIcon className="w-4 h-4 text-indigo-500" />,
  ADMIN: <ShieldExclamationIcon className="w-4 h-4 text-rose-500" />,
};

const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModalStore();
  const [loadingId, setLoadingId] = useState<string>();
  const router = useRouter();

  const isModalOpen = isOpen && type === "members";

  const { server } = data as { server: ServerWithMemberAndProfile };

  console.log(
    server?.Members?.map((item) => item.profile?.imageUrl),
    server,
    "server"
  );

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.patch(url, {
        role,
      });
      router?.refresh();

      onOpen("members", { server: response.data });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId("");
    }
  };

  const onKick = async (memberId: string) => {
    try {
      console.log("i am here");
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const response = await axios.delete(url);
      router?.refresh();

      onOpen("members", { server: response.data });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <>
      <ModalComp isOpen={isModalOpen} onClose={onClose}>
        <div className="flex w-full flex-col  items-center gap-6">
          <div className="flex w-full flex-col items-center gap-2">
            <h1 className="text-2xl font-medium text-neutral-900 dark:text-neutral-50">
              Invite Friends
            </h1>

            <p className="text-neutral-500 text-sm dark:text-neutral-300">
              {server?.Members?.length !== undefined
                ? server?.Members?.length
                : "Loading..."}{" "}
              Members
            </p>
          </div>
          <div className="w-full flex flex-col gap-4 h-28 overflow-y-auto no-scrollbar">
            {server?.Members?.map((member, index) => (
              <div className="flex justify-between items-center" key={index}>
                <div className="flex w-full items-center gap-3">
                  <Avatar img={member?.profile?.imageUrl} rounded />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <h2 className="text-sm">{member?.profile?.name}</h2>
                      {roleIconMap[member?.role]}
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-300">
                      {member?.profile?.email}
                    </p>
                  </div>
                </div>

                {server?.profileId !== member?.profileId && (
                  <div className="">
                    <Menu as={`div`}>
                      <MenuButton
                        className={`${
                          loadingId === member?.id ? "hidden" : ""
                        }`}
                      >
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </MenuButton>
                      <MenuItems
                        className={`mt-2 cursor-pointer w-20 text-center  z-40 origin-top-right rounded-md border border-white/5 bg-neutral-100 p-1 text-xs text-neutral-900 transition duration-100 ease-out `}
                        transition
                        anchor="left end"
                      >
                        <MenuItem
                          className={` py-1 px-3 hover:bg-neutral-200 bg-neutral-100 rounded-md`}
                          as={"div"}
                        >
                          <Menu>
                            <MenuButton>Role</MenuButton>
                            <MenuItems
                              className={`mt-2 cursor-pointer w-32 text-center  z-40 origin-top-right rounded-md border border-white/5 bg-neutral-100 p-1 text-xs text-neutral-900 transition duration-100 ease-out `}
                              transition
                              anchor="bottom end"
                            >
                              <MenuItem
                                onClick={() =>
                                  onRoleChange(member?.id, MemberRole.GUEST)
                                }
                                className={`flex items-center justify-center gap-2 py-2 px-3 hover:bg-neutral-200 bg-neutral-100 rounded-md`}
                                as={"div"}
                              >
                                GUEST
                                {member?.role === MemberRole.GUEST && (
                                  <CheckIcon className="w-4 h-4" />
                                )}
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  onRoleChange(member?.id, MemberRole.MODERATOR)
                                }
                                className={`flex gap-2 justify-center items-center text-xs py-2 px-3 hover:bg-neutral-200 bg-neutral-100 rounded-md`}
                                as={"div"}
                              >
                                MODERATOR
                                {member?.role === MemberRole.MODERATOR && (
                                  <CheckIcon className="w-4 h-4" />
                                )}
                              </MenuItem>
                            </MenuItems>
                          </Menu>
                        </MenuItem>
                        <MenuItem
                          onClick={() => onKick(member?.id)}
                          className={` py-1 px-3 hover:bg-neutral-200 bg-neutral-100 rounded-md`}
                          as={`div`}
                        >
                          Kick
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                )}
                {loadingId === member?.id && (
                  <ArrowPathIcon className="w-5 h-5 animate-spin text-neutral-500 dark:text-neutral-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </ModalComp>
    </>
  );
};

export default MembersModal;
