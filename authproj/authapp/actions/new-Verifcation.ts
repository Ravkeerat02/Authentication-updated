"use server";
import { db } from "../lib/db";
import { getUserByEmail } from "../data/user";
import { getVerificationTokenByToken } from "../data/verification-token";

// checking for token expiry
export const newVerifcationToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { Error: "Verification toke doesnt exist" };
  }
  // if it has expired
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { Error: "Verification token is expired" };
  }
  //   // if it has been used
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { Error: "User doesnt exist" };
  }

  //   updating db
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });
  //   remove token
  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });
  return { success: "Email verified successfully" };
};
