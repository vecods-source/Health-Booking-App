import React from "react";
import Image from "next/image";
import AppointmentForm from "@/components/forms/appointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
const NewAppointment = async ({ params: { userid } }: SearchParamProps) => {
  const patient = await getPatient(userid);
  return (
    <>
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container">
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
            />

            <AppointmentForm
              patientid={patient?.$id}
              userid={userid}
              type="create"
            />

            <p className="copyright py-12">© 2024 CarePluse</p>
          </div>
        </section>

        <Image
          src="/assets/images/appointment-img.png"
          height={1000}
          width={1000}
          alt="patient"
          className="side-img max-w-[390px]"
        />
      </div>
    </>
  );
};

export default NewAppointment;
