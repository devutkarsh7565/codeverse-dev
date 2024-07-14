"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import FormField, { FormData } from "../FormField/FormField";
import { error } from "console";
import FileUpload from "../FileUpload/FileUpload";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useModalStore } from "@/hooks/useModalStore";
import ModalComp from "./ModalComp";
import ButtonComp from "../Button/Button";
import { ChannelType } from "@prisma/client";
import qs from "query-string";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .refine((name) => name !== "general", {
      message: "Name cannot be 'general'",
    }),

  type: z.nativeEnum(ChannelType),
});

const CreateChannelModal = () => {
  const params = useParams();
  const { isOpen, onClose, type } = useModalStore();

  const isModelOpen = isOpen && type === "createChannel";

  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelType.AUDIO,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log(data);
    try {
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: params.serverId,
        },
      });
      await axios.post(url, data);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const error = form.formState.errors;

  const selectOptions = [
    {
      name: "Text",
      value: ChannelType.TEXT,
    },
    {
      name: "Audio",
      value: ChannelType.AUDIO,
    },
    {
      name: "Video",
      value: ChannelType.VIDEO,
    },
  ];

  return (
    <>
      <ModalComp isOpen={isModelOpen} onClose={onClose}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 dark:bg-neutral-800 bg-opac"
        >
          <div className="flex w-full flex-col items-center gap-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Create Channel
            </h3>
          </div>

          <div>
            <div className="w-full flex flex-col gap-5">
              <div className="flex flex-col gap-1 w-full ">
                <Label
                  className="text-neutral-500 dark:text-neutral-300 text-xs"
                  htmlFor="email"
                  value="Channel Name"
                />
                <FormField
                  type="text"
                  name="name"
                  error={error.name}
                  placeholder="name"
                  register={form.register}
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <Label
                  className="text-neutral-500 dark:text-neutral-300 text-xs"
                  htmlFor="email"
                  value="Channel Type"
                />
                <FormField
                  type="text"
                  name="type"
                  error={error.type}
                  placeholder="Channel Type"
                  register={form.register}
                  inputType="select"
                  selectOptions={selectOptions}
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            <ButtonComp color="dark" label="Create" />
          </div>
        </form>
      </ModalComp>
    </>
  );
};

export default CreateChannelModal;
