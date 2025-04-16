"use client";

import React from "react";

import ToggleTheme from "./toggle-theme";
import { CgMenuMotion } from "react-icons/cg";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlinePriorityHigh } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa6";
import { Button } from "./button";
import { CiBookmark } from "react-icons/ci";

interface Props {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

const SideLinks: Props[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <GoHome size={20} />,
  },
  {
    name: "Add Task",
    href: "/dashboard/task/new",
    icon: <IoIosAdd size={20} />,
  },
  {
    name: "Task",
    href: "/dashboard/task/taskAdded",
    icon: <CiBookmark size={20} />,
  },
  {
    name: "Priority Tasks",
    href: "/dashboard?filter=priority",
    icon: <MdOutlinePriorityHigh size={20} />,
  },
  {
    name: "Completed Tasks",
    href: "/dashboard/completed",
    icon: <FaCheck size={20} />,
  },
  {
    name: "Due soon",
    href: "/dashboard?filter=due_soon",
    icon: <IoTimeOutline size={20} />,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: <AiOutlineSetting size={20} />,
  },
];

export default function DashboardNav() {
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="flex justify-between items-start w-full">
      <div className="lg:hidden flex justify-center items-center p-2  h-full">
        <CgMenuMotion size={30} onClick={toggleMenu} />
      </div>
      <div className="flex lg:hidden justify-start items-center p-2">
        <h1 className={`text-2xl font-bold futura`}>Just Do It.</h1>
      </div>
      <div className="flex lg:justify-end lg:w-full border-b p-2 ">
        <ToggleTheme />
      </div>
      {menu && (
        <div className="fixed lg:hidden top-0 flex flex-col gap-2 border-r p-2 w-full h-screen dark:bg-black/50  backdrop-blur-sm transition-all ease-in-out duration-300 z-10">
          <div className="absolute top-0 left-0 h-full w-[200px] border-r  dark:border-white/40 dark:bg-black  bg-white   dark:text-white ">
            <div className="flex flex-col justify-start items-center p-2 gap-[2rem] h-full">
              <div className="flex justify-between items-center p-2 w-full border-b-2">
                <h1 className="text-[16px] font-medium">Hide me</h1>
                <Button onClick={toggleMenu}>
                  <FaArrowLeft size={16} />
                </Button>
              </div>
              <ul className="flex flex-col gap-2 ">
                {SideLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      onClick={toggleMenu}
                      href={link.href}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${
                  pathname === link.href
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                }
              `}
                    >
                      <span className="text-lg">{link.icon}</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center p-2 w-full border-t-2">
                <h1>Dark Mode</h1>
                <ToggleTheme />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
