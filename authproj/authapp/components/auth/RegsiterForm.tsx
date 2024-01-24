"use client";
import { CardWrapper } from "./CardWrapper";
// form

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Form, FormItem, FormLabel, FormMessage } from "../ui/form";
// DATA
import { RegisterSchema } from "../../schemas/Index";
import { FormControl, FormField } from "../ui/form";
// input
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "../../actions/register";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  // submit function
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    // on new and clear
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Craete an acct"
      backBtnLabel="Already have an acct?"
      backBtnHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Jane Doe"
                      // abc123
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="janedoe@abc.com"
                      type="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      // abc123
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {/* error */}
          <FormError message={error} />
          {/* success */}
          <FormSuccess message={success} />
          <Button className="w-full  " type="submit">
            Create(REGISTER) an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
function setError(error: any) {
  throw new Error("Function not implemented.");
}
