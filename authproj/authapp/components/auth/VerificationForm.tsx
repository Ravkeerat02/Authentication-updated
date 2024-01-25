"use client";

import { CardWrapper } from "./CardWrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerifcationToken } from "../../actions/new-Verifcation";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const VerifyForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Define an asynchronous function to handle the verification
  const handleVerification = async () => {
    try {
      if (!token) {
        setError("Invalid");
        return;
      }

      // Call the asynchronous action newVerifcationToken
      const data = await newVerifcationToken(token);

      // Set success and error based on the response
      setSuccess(data.success);
      setError(data.error);
    } catch (error) {
      // Handle errors, e.g., if the promise is rejected
      setError("Invalid");
      setSuccess(undefined);
    }
  };

  // Use useEffect to call handleVerification when the component mounts
  useEffect(() => {
    handleVerification();
  }, [token]);

  return (
    <CardWrapper
      headerLabel="Confirm ID"
      backBtnHref="/auth/login"
      backBtnLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        <BeatLoader />
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};
