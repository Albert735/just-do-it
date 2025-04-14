import React from "react";
import { Button } from "@/components/ui/button";
import FormNav from "@/components/ui/FormNav";
import Link from "next/link";

export default function page() {
  return (
    <>
      <FormNav />
      <div className="flex justify-center items-center h-[calc(100vh-4rem)] ">
        <div className="flex flex-col gap-[3rem] border py-8 px-8 rounded-lg w-[22rem]">
          <h1 className="text-xl font-bold text-center">
            Create a new account
          </h1>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-500" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border p-2 rounded-lg"
                placeholder="example@example.com"
              />
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
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-500" htmlFor="password">
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                className="border p-2 rounded-lg"
                placeholder="confirm password"
              />
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
