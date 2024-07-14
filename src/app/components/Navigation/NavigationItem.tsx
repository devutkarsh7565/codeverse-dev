"use client";
import React from "react";
import TooltipComponent from "../Tooltip/Tooltip";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}
const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const router = useRouter();
  const param = useParams();

  return (
    <>
      <TooltipComponent content={name} placement="right">
        <button
          onClick={() => router.push(`/server/${id}`)}
          className="w-full cursor-pointer flex items-center"
        >
          <div
            className={`absolute left-0 ${
              param?.serverId === id
                ? "dark:bg-neutral-100 bg-neutral-600 h-8 w-1 rounded-tr-md rounded-br-md"
                : "dark:bg-neutral-100 bg-neutral-600 h-3 w-1 rounded-tr-md rounded-br-md"
            }`}
          />
          <div className="relative w-8 h-8 ">
            <Image
              src={imageUrl}
              alt=""
              layout="fill"
              className="w-full h-full object-cover rounded-lg border border-neutral-300 dark:border-neutral-600"
            />
          </div>
        </button>
      </TooltipComponent>
    </>
  );
};

export default NavigationItem;
