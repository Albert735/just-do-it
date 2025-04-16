"use client";

import React from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import ToggleTheme from "./toggle-theme";


export default function formNav() {
  return (
    <div className="flex justify-between items-center max-w-screen-xl mx-auto p-4">
      <div>
        <Link href="/">
          <h1 className={`text-3xl font-bold futura `}>Just Do It.</h1>
        </Link>
      </div>
      <div className="flex gap-4">
        <ToggleTheme />
        <Link href={"/"}>
          <Button variant={"default"} className="rounded-full">
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
}
