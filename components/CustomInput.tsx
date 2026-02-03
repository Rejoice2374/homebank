import React from "react";
import { FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Control, Controller, FieldPath } from "react-hook-form";
import { Input } from "./ui/input";
import z from "zod";
import { authFormSchema } from "@/lib/utils";

interface CustomInputProps {
  control: Control<z.infer<ReturnType<typeof authFormSchema>>>;
  name: FieldPath<z.infer<ReturnType<typeof authFormSchema>>>;
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
