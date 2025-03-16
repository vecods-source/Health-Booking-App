import { z } from "zod";

const UserFormValidation = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Too short! Minimum 10 digits")
    .regex(/^[+]?[0-9\s-]+$/, "Enter a valid number"),
});
export default UserFormValidation;
