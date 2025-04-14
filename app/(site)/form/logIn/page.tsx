import React from "react";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-4rem)] ">
      <div className="flex flex-col gap-[2rem] border py-8 px-8 rounded-lg w-[22rem]">
        <h1 className="text-xl font-bold text-center">
          Log In to your account
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
          <Button
            type="submit"
            variant={"outline"}
            className="font-bold py-2 px-4 rounded-lg"
          >
            <span>Sign Up</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
