"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { GoHome } from "react-icons/go";
import { IoIosAdd } from "react-icons/io";
import { MdOutlinePriorityHigh } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";

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
    name: "Priority Tasks",
    href: "/dashboard?filter=priority",
    icon: <MdOutlinePriorityHigh size={20} />,
  },
  {
    name: "Completed Tasks",
    href: "/dashboard?filter=completed",
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

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState(0);

  const handleLinkClick = (index: number) => {
    setActiveLink(index);
  };

  return (
    <div className="hidden lg:flex flex-col justify-start h-full px-4 py-4 bg-white/5 border-r gap-[2rem]">
      <div className="flex items-center gap-2 border-b pb-4">
        <h1 className="text-2xl font-bold futura">Just Do It.</h1>
      </div>
      <div>
        <ul className="flex flex-col gap-2 ">
          {SideLinks.map((link, index) => (
            <li
              onClick={() => handleLinkClick(index)}
              key={index}
              className={`flex items-center gap-3 hover:dark:bg-white/10 hover:dark:text-white hover:bg-black/20 hover:text-black  px-2 py-2 rounded-sm transition-all duration-200 ease-in-out ${
                activeLink === index
                  ? "dark:bg-white dark:text-black bg-black text-white "
                  : "hover:dark:text-white"
              }`}
            >
              <span>{link.icon}</span>
              <Link href={link.href} className="text-[16px]">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
