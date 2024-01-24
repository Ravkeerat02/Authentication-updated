"use server";
import * as z from "zod";
import { RegisterSchema } from "../schemas/Index";
import bcrypt from "bcrypt";
import { db } from "../lib/db";
import { getUserByEmail } from "../data/user";

// register
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  //   console.log(values);
  // validation
  //   safe parse - validate data - instead of error - object is retuned
  const validatedForm = RegisterSchema.safeParse(values);

  if (!validatedForm.success) {
    return { error: "Invalid Data" };
  }
  // encrypt password
  const { email, password, name } = validatedForm.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // send token email

  return { success: "Creation successful " };
};
