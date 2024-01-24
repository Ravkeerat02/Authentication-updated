"use server";
import * as z from "zod";
import { LoginSchema } from "../schemas/Index";
import { signIn } from "../auth";
import { DEFAULT_LOIGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";

// login
export const login = async (values: z.infer<typeof LoginSchema>) => {
  //   console.log(values);
  // validation
  //   safe parse - validate data - instead of error - object is retuned
  const validatedForm = LoginSchema.safeParse(values);

  if (!validatedForm.success) {
    return { error: "Invalid Data" };
  }

  const { email, password } = validatedForm.data;
  try {
    await signIn("creds", {
      email,
      password,
      redirectTo: DEFAULT_LOIGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return {
            error: "Somthing went wrong",
          };
      }
      throw error;
    }
  }
};
