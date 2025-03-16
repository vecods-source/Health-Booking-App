/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Image from "next/image";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { Input } from "./ui/input";
import { FormFeildType } from "./forms/patientForm";
interface CustomProps {
  control: Control<any>;
  fieldType: FormFeildType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dataFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}
const RenderFeild = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, placeholder, iconSrc, iconAlt } = props;
  switch (fieldType) {
    case FormFeildType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && iconAlt && (
            <Image
              src={iconSrc}
              alt={iconAlt}
              height={24}
              width={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
              style={{ borderRadius: "0px 5px 5px 0" }}
            />
          </FormControl>
        </div>
      );
    case FormFeildType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="QA"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className="shad-input input-phone"
          />
        </FormControl>
      );
    default:
      break;
  }
};
function CustomFormFeild(props: CustomProps) {
  const { control, fieldType, name, label, placeholder, iconSrc, iconAlt } =
    props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFeildType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderFeild field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormFeild;
