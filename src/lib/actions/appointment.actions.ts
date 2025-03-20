'use server'
import { ID } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databses } from "../appwrite.config";
import { parseStringify } from "../utils";

export const creatAppointment =  async (appointment:CreateAppointmentParams) => {
  try {
    
    console.log({...appointment});
    console.log(appointment);
    const newAppointment = await databses.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    console.log(newAppointment);
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};