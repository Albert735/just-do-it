"use client";

import React from "react";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { IoIosAdd } from "react-icons/io";
import { MdOutlinePriorityHigh } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { CiBookmark } from "react-icons/ci";
import { LayoutDashboard, Target } from "lucide-react";

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
    name: "Kanban Board",
    href: "/dashboard/kanban",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Focus Mode",
    href: "/dashboard/focus",
    icon: <Target size={20} />,
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

export default function Sidebar() {
  const pathname = usePathname();


  return (
    <div className="hidden lg:flex flex-col justify-start h-full px-4 py-4 bg-white/5 border-r gap-[2rem]">
      <div className="flex items-center gap-2 border-b pb-4">
        <h1 className="md:text-2xl font-bold futura">Just Do It.</h1>
      </div>
      <div>
        <ul className="flex flex-col gap-2 ">
          {SideLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${pathname === link.href
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
      </div>
    </div>
  );
}
