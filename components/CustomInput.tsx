import React from "react";
import { FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Control, Controller, FieldPath } from "react-hook-form";
import { Input } from "./ui/input";
import z from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type,
}: CustomInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="form-item">
          <FieldLabel className="form-label">{label}</FieldLabel>

          <Input
            {...field}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            type={type}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </div>
      )}
    />
  );
};

export default CustomInput;
