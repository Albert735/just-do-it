import React from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import ToggleTheme from "./toggle-theme";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center max-w-screen-xl mx-auto p-4">
      <div>
        <h1 className={`md:text-3xl text-xl font-bold futura`}>Just Do It.</h1>
      </div>
      <div className="flex gap-4">
        <ToggleTheme />
        <Link href={"/form/logIn"}>
          <Button variant={"outline"} className="rounded-full">
            log in
          </Button>
        </Link>

        <Link href={"/form/signUp"}>
          <Button variant={"default"} className="rounded-full">
            sign up
          </Button>
        </Link>
      </div>
    </div>
  );
}
