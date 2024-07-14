"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import React from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <>
        <div className="flex items-center justify-center w-full">
          <div className="relative w-[120px] h-[120px]">
            <Image
              src={value}
              layout="fill"
              className="w-full h-full object-cover rounded-full"
              alt=""
            />
            <button
              type="button"
              className="rounded-full absolute top-1 -right-1 p-2 bg-red-600"
              onClick={() => onChange("")}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <main className="flex h-[300px] flex-col items-center justify-between p-4">
        <UploadDropzone
          className=" "
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            // Do something with the response
            onChange(res[0].url);
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </main>
    </>
  );
};

export default FileUpload;
