import React from "react";
import ToggleTheme from "./toggle-theme";
import { CgMenuMotion } from "react-icons/cg";

export default function DashboardNav() {
  return (
    <div className="flex justify-between items-start p-3">
      <div className="lg:hidden flex justify-center items-center p-2">
        <CgMenuMotion size={26} />
      </div>
      <div className="flex justify-end w-full border-b p-2">
        <ToggleTheme />
      </div>
    </div>
  );
}
