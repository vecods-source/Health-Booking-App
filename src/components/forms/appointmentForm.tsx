"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormFeild from "../CustomFormFeild";
import { AppointmentFormValidation } from "@/lib/UserFormValidation";
import { useForm } from "react-hook-form";
import { FormFeildType } from "./patientForm";
import { Doctors } from "../../../constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import SubmitButton from "../ui/submitButton";
import { creatAppointment } from "@/lib/actions/appointment.actions";
import { useRouter } from "next/navigation";
function AppointmentForm({
  userid,
  patientid,
  type,
}: {
  userid: string;
  patientid: string;
  type: "create" | "cancel" | "schedule";
}) {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    mode: "onBlur",
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setLoading(true);
    console.log({ ...values });
    try {
      let status;
      switch (type) {
        case "schedule":
          status = "scheduled";
          break;
        case "cancel":
          status = "cancelled";
          break;
        default:
          status = "pending";
      }
      let appointmentData;

      switch (type) {
        case "create":
          appointmentData = {
            userid,
            patient: patientid,
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            reason: values.reason,
            note: values.note,
            status: status as Status,
          };
          const newAppointment = await creatAppointment(appointmentData);
          if (newAppointment) {
            form.reset();
            router.push(
              `/patients/${userid}/new-appointment/sucess?appointmentId=${newAppointment.$id}`
            );
          }
          break;
        case "cancel":
          break;
        default:
          appointmentData = null;
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
          <h1 className="text-[45px] font-[700]">Book an Appointemnt</h1>
          <p className="text-dark-700 !mt-0">
            Request a new appointment in 10 seconds
          </p>
        </section>
        <section className="space-y-6 ">
          <div className="!mb-2 space-y-1">
            <h1 className="sub-header">Personal Information</h1>
          </div>
        </section>
        <div className="!mt-[18px]">
          <CustomFormFeild
            fieldType={FormFeildType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a doctor"
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
          <div className="flex flex-col gap-6 xl:flex-row !mt-[10px]">
            <CustomFormFeild
              control={form.control}
              fieldType={FormFeildType.TEXTAREA}
              name="reason"
              label="Reason for appointment"
              placeholder="ex: Annual montly check-up"
            />
            <CustomFormFeild
              control={form.control}
              fieldType={FormFeildType.TEXTAREA}
              name="note"
              label="Additional comments/notes"
              placeholder="ex: Prefer afternoon appointments, if possible"
            />
          </div>
          <CustomFormFeild
            fieldType={FormFeildType.DATA_PICKER}
            control={form.control}
            name="schedule"
            label="Expected appointment date"
            showTimeSelected={true}
            dateFormat="dd/MM/yyyy   -   hh:mm aa"
          />
        </div>
        <SubmitButton isLoading={isLoading} loadingText="just a second...">
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
}

export default AppointmentForm;
