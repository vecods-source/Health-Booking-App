/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormFeild from "@/components/CustomFormFeild";
import SubmitButton from "../ui/submitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/UserFormValidation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFeildType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATA_PICKER = "dataPicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    mode: "onBlur",
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setLoading(true);

    try {
      const userDate = { name, email, phone };
      const user = await createUser(userDate);
      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="text-[45px] font-[700]">Hi there...</h1>
          <p className="text-dark-700 mt-0">Get Started with Appointments.</p>
        </section>
        <CustomFormFeild
          control={form.control}
          fieldType={FormFeildType.INPUT}
          name="name"
          label="Full Name"
          placeholder="Mohamed Saad"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormFeild
          control={form.control}
          fieldType={FormFeildType.INPUT}
          name="email"
          label="Email"
          placeholder="mohamed.saad@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormFeild
          control={form.control}
          fieldType={FormFeildType.PHONE_INPUT}
          name="phone"
          label="Phone"
          placeholder="+974 55600224"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <SubmitButton isLoading={isLoading} loadingText="just a second...">
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
