// import { string, boolean, object } from "zod";
import { z } from "zod";

// login
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

// register
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
