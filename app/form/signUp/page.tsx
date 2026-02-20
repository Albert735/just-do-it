"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import FormNav from "@/components/ui/FormNav";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <FormNav />
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="flex flex-col gap-[3rem] border py-8 px-8 rounded-lg w-[22rem]">
          <h1 className="text-xl font-bold text-center">
            Create a new account
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-500" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border p-2 rounded-lg"
                placeholder="example@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-slate-600 dark:text-slate-400">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-500" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border p-2 rounded-lg"
                placeholder="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-slate-600 dark:text-slate-400">{errors.password.message}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label
                className="text-sm text-gray-500"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="border p-2 rounded-lg"
                placeholder="confirm password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-slate-600 dark:text-slate-400">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              variant={"default"}
              className="font-bold py-2 px-4 rounded-lg"
            >
              <span>Sign Up</span>
            </Button>
          </form>

          <div className="flex justify-center items-center gap-2">
            <span className="text-sm text-gray-500 ">
              Already have an account?
            </span>
            <span className="text-sm underline">
              <Link href="/form/logIn">Log In</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
