"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import FormField, { FormData } from "../FormField/FormField";
import { error } from "console";
import FileUpload from "../FileUpload/FileUpload";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useModalStore } from "@/hooks/useModalStore";
import ModalComp from "./ModalComp";
import ButtonComp from "../Button/Button";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),

  imageUrl: z.string().min(1, {
    message: "Image Url must be at least 1 characters",
  }),
});

const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModalStore();

  const isModelOpen = isOpen && type === "createServer";

  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    try {
      await axios.post("/api/servers", data);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const error = form.formState.errors;

  const handleFileChange = (url?: string) => {
    form.setValue("imageUrl", url ?? "");
    form.trigger("imageUrl");
  };

  return (
    <>
      <ModalComp isOpen={isModelOpen} onClose={onClose}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 dark:bg-neutral-800 bg-opac"
        >
          <div className="flex w-full flex-col items-center gap-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Customize your Server
            </h3>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Create your server a personality with your name and an image you
              can always change it later .
            </p>
          </div>

          <div>
            <FileUpload
              endpoint="serverImage"
              onChange={handleFileChange}
              value={form.watch("imageUrl")}
            />
            {error && (
              <span className="error-message">{error.imageUrl?.message}</span>
            )}
          </div>
          <div>
            {/* <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div> */}

            <FormField
              type="text"
              name="name"
              error={error.name}
              placeholder="name"
              register={form.register}
            />
          </div>

          <div className="w-full">
            <ButtonComp color="dark" label="Create" />
          </div>
        </form>
      </ModalComp>
    </>
  );
};

export default CreateServerModal;
