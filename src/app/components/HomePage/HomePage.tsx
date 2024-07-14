"use client";

import { Button } from "flowbite-react";
import React from "react";
import CreateServerModal from "../modals/CreateServerModal";
import { useModalStore } from "@/hooks/useModalStore";

const HomePage = () => {
  const { onOpen, type } = useModalStore();

  return (
    <>
      <Button onClick={() => onOpen("createServer")}>Toggle modal</Button>
    </>
  );
};

export default HomePage;
