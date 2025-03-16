import Image from "next/image";
import Link from "next/link";
import PatientForm from "@/components/forms/patientForm";
export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px] gap-20">
          <Image
            src="/assets/icons/logo-full.svg"
            alt={"LOGO"}
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 carePlus
            </p>
            <Link className="text-green-500" href="/?addmin=true">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src={"/assets/images/onboarding-img.png"}
        alt="Doctors image"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      ></Image>
    </div>
  );
}
