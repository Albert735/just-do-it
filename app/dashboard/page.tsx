// import ToggleTheme from "@/components/ui/toggle-theme";
import React from "react";
import Link from "next/link";

type CardProps = {
  title: string;
  area: string;
  color: string;
  href?: string;
};

const cards: CardProps[] = [
  {
    title: "Add Task",
    area: "col-start-1 col-end-3 row-start-1 row-end-3",
    color: "bg-green-100",
    href: "/dashboard/task/new",
  },
  {
    title: "Priority Tasks",
    area: "col-start-1 col-end-3 row-start-3 row-end-5",
    color: "bg-red-100",
    href: "/dashboard/task/priority",
  },
  {
    title: "Completed Tasks",
    area: "col-start-3 col-end-5 row-start-1 row-end-5",
    color: "bg-blue-100",
    href: "/dashboard/task/completed",
  },
  {
    title: "Due Soon",
    area: "col-start-5 col-end-7 row-start-1 row-end-3",
    color: "bg-yellow-100",
    href: "/dashboard/task/due_soon",
  },
  {
    title: "Settings",
    area: "col-start-5 col-end-7 row-start-3 row-end-5",
    color: "bg-purple-100",
    href: "/dashboard/settings",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 h-full bg-amber-200">
      <div className="grid grid-cols-6 grid-rows-4 gap-4 p-6 h-full">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.area} ${card.color} rounded-xl p-6 shadow-sm flex flex-col justify-between transition hover:shadow-md`}
          >
            {card.href && (
              <Link href={card.href}>
                <h2 className="text-xl font-semibold text-gray-800">
                  {card.title}
                </h2>

                <p className="text-sm text-gray-600">
                  {card.title === "Add Task"
                    ? "Create a new task and assign priority or due date."
                    : card.title === "Priority Tasks"
                    ? "View tasks with high importance."
                    : card.title === "Completed Tasks"
                    ? "See all tasks you’ve marked as done."
                    : card.title === "Due Soon"
                    ? "Tasks that are approaching their deadlines."
                    : "Customize your app preferences."}
                </p>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
