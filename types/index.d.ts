
declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type Gender = "Male" | "Female";
  declare type Status = "pending" | "scheduled" | "cancelled";
  
  declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
  }
  declare interface User extends CreateUserParams {
    $id: string;
  }
  
  declare interface RegisterUserParams extends CreateUserParams {
    userid: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContact: string;
    phoneEmergency: string;
    primaryPhysician: string;
    InsuranceProvider: string;
    InsurancePolicy: string;
    allergies?: string | undefined;
    currentMedications?: string | undefined;
    familyMed?: string | undefined;
    pastMedical?: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    privacyConsent: boolean;
    disclosureConsent: boolean;
    treatmentConsent: boolean;
  }
  
  declare type CreateAppointmentParams = {
    userid: string;
    patient: string;
    primaryPhysician: string;
    reason: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
  };
  
  declare type UpdateAppointmentParams = {
    appointmentId: string;
    userId: string;
    appointment: Appointment;
    type: string;
  };