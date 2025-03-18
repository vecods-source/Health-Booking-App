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
import UserFormValidation from "@/lib/UserFormValidation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFeildType } from "./patientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions } from "../../../constants";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { SelectItem } from "../ui/select";
const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
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
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="text-[45px] font-[700]">Welcome</h1>
          <p className="text-dark-700 !mt-0">Let us know more about yourself</p>
        </section>
        <section className="space-y-6 ">
          <div className="!mb-2 space-y-1">
            <h1 className="sub-header">Personal Information</h1>
          </div>
        </section>
        <div className="!mt-[18px]">
          <CustomFormFeild
            control={form.control}
            fieldType={FormFeildType.INPUT}
            name="name"
            label="Full Name"
            placeholder="ex: Khalid"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row !mt-[10px]">
          <CustomFormFeild
            control={form.control}
            fieldType={FormFeildType.INPUT}
            name="email"
            label="Email address"
            placeholder="khalid.saad@hotmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormFeild
            control={form.control}
            fieldType={FormFeildType.PHONE_INPUT}
            name="phone"
            label="Phone number"
            placeholder="5560xxxxx"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row !mt-[10px]">
          <CustomFormFeild
            fieldType={FormFeildType.DATA_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of birth"
          />

          <CustomFormFeild
            fieldType={FormFeildType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option, i) => (
                    <div key={option + i} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer w-full">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row !mt-[10px]">
          <CustomFormFeild
            control={form.control}
            fieldType={FormFeildType.INPUT}
            name="address"
            label="Address"
            placeholder="ex: Al-mashaf, wakrah"
          />
          <CustomFormFeild
            control={form.control}
            fieldType={FormFeildType.INPUT}
            name="occupation"
            label="Occupation"
            placeholder="ex: Civil Engineer"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row !mt-[10px]">
          <CustomFormFeild
            control={form.control}
            fieldType={FormFeildType.INPUT}
            name="emergencyContact"
            label="Emergency contact name"
            placeholder="Guardian's name"
          />
          <CustomFormFeild
            control={form.control}
            fieldType={FormFeildType.PHONE_INPUT}
            name="phone"
            label="Phone number"
            placeholder="5560xxxxx"
          />
        </div>

        {/* section 2 */}
        <section className="space-y-6 ">
          <div className="!mb-2 space-y-1">
            <h1 className="sub-header">Medical Information</h1>
          </div>
        </section>
        <div className="!mt-[18px]">
          <CustomFormFeild
            fieldType={FormFeildType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormFeild>
        </div>
        <div className="flex flex-col gap-6 xl:flex-row !mt-[10px]">
          <CustomFormFeild
            control={form.control}
            fieldType={FormFeildType.INPUT}
            name="InsuranceProvider"
            label="Insurance provider"
            placeholder="ex: JBK"
          />
          <CustomFormFeild
            control={form.control}
            fieldType={FormFeildType.INPUT}
            name="InsurancePolicy"
            label="Insurance policy number"
            placeholder="ex: ABC1234567"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row !mt-[10px]">
          <CustomFormFeild
            control={form.control}
            fieldType={FormFeildType.TEXTAREA}
            name="allergies"
            label="Allergies (if any)"
            placeholder="ex: Peanuts, Penicillin, Pollen"
          />
          <CustomFormFeild
            control={form.control}
            fieldType={FormFeildType.TEXTAREA}
            name="currentMedications"
            label="Current medications"
            placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row !mt-[10px]">
          <CustomFormFeild
            control={form.control}
            fieldType={FormFeildType.TEXTAREA}
            name="familyMed"
            label="Family medical history (if relevant)"
            placeholder="ex: Mother had cancer"
          />
          <CustomFormFeild
            control={form.control}
            fieldType={FormFeildType.TEXTAREA}
            name="pastMedical"
            label="Past medical history"
            placeholder="ex: Asthma diagnosis in childhood"
          />
        </div>
        <SubmitButton isLoading={isLoading} loadingText="just a second...">
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
