"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import FormNav from "@/components/ui/FormNav";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string; // Added email field
  password: string;
};

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("email", "password"));

  return (
    <>
      <FormNav />

      <div className="flex justify-center items-center h-[calc(100vh-4rem)] ">
        <div className="flex flex-col gap-[2rem] border py-8 px-8 rounded-lg w-[22rem]">
          <h1 className="text-xl font-bold text-center">
            Log In to your account
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-500" htmlFor="email">
                Email
              </label>
              <input
                aria-invalid={errors.email ? "true" : "false"}
                type="email"
                id="email"
                className="border p-2 rounded-lg"
                placeholder="example@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
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
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              variant={"default"}
              className="font-bold py-2 px-4 rounded-lg"
            >
              <span>Log In</span>
            </Button>
          </form>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500 text-center">
              Don&apos;t have an account?
            </span>

            <Link href="/form/signUp">
              <Button
                type="submit"
                variant={"outline"}
                className="font-bold py-2 px-4 rounded-lg w-full"
              >
                <span>Sign Up</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
