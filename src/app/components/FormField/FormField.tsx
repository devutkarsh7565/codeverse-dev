import { Select } from "@headlessui/react";
import { ChannelType } from "@prisma/client";
import { TextInput } from "flowbite-react";
import { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = {
  email: string;
  githubUrl: string;
  yearsOfExperience: number;
  password: string;
  confirmPassword: string;
  name: string;
  imageUrl: string;
  type: ChannelType;
};
export type ValidFieldNames =
  | "email"
  | "githubUrl"
  | "yearsOfExperience"
  | "password"
  | "confirmPassword"
  | "name"
  | "imageUrl"
  | "type";

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  inputType?: "select";
  selectOptions?: {
    name: string;
    value: string;
  }[];
};

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  inputType,
  selectOptions,
}) => {
  if (inputType === "select") {
    console.log("select", name);
    return (
      <>
        <Select
          {...register(name)}
          className={`bg-neutral-100 outline-none cursor-pointer dark:bg-neutral-800 px-3 py-2 rounded-md w-full`}
          aria-label="Project status"
        >
          {selectOptions?.map((option) => (
            <option
              className={`bg-neutral-100 cursor-pointer dark:bg-neutral-800 px-3 py-2 w-full`}
              key={option.value}
              value={option.value}
            >
              {option.name}
            </option>
          ))}
        </Select>
      </>
    );
  }
  return (
    <>
      <TextInput
        className="bg-neutral-100 dark:bg-neutral-800"
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      />
      {error && <span className="error-message">{error.message}</span>}
    </>
  );
};
export default FormField;
