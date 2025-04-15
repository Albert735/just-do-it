"use client";

import { Reorder } from "framer-motion";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
// import { ConfettiButton } from "@/components/magicui/confetti";
import { ConfettiBoth } from "@/components/ui/confettiBoth";

type Task = {
  id: number;
  title: string;
  description: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Spotify API Integration",
    description:
      "Integrate Spotify API to fetch playlists, artists, and albums for the dashboard UI.",
  },
  {
    id: 2,
    title: "UI Enhancements",
    description:
      "Improve typography, add spacing, hover effects, and responsive layouts across all pages.",
  },
  {
    id: 3,
    title: "Authentication",
    description:
      "Implement user authentication with JWT and protect task-related routes for security.",
  },
  {
    id: 4,
    title: "Persistent Storage",
    description:
      "Use localStorage or a database to save tasks between browser sessions.",
  },
  {
    id: 5,
    title: "Due Date Feature",
    description:
      "Add due date input to tasks and show overdue tasks with warning colors.",
  },
  {
    id: 6,
    title: "Priority Levels",
    description:
      "Allow users to mark tasks as low, medium, or high priority and filter by importance.",
  },
];

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [complete, setComplete] = useState<Task[]>([]);

  return (
    <div className="flex flex-col justify-center items-center gap-6 px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Tasks Added
      </h1>

      <Reorder.Group
        axis="y"
        values={tasks}
        onReorder={setTasks}
        className="w-full max-w-2xl flex flex-col gap-4"
      >
        {tasks.map((task) => (
          <Reorder.Item
            key={task.id}
            value={task}
            className="cursor-grab active:cursor-grabbing"
          >
            <div className="flex gap-4 p-5 bg-white dark:bg-white/5 rounded-xl  border border-gray-200 dark:border-white/10 transition-all hover:shadow-sm">
              {/* Optional Task ID or Icon */}
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600 font-bold text-lg">
                {task.id}
              </div>

              {/* Task Content */}
              <div className="flex flex-col gap-1 overflow-hidden  w-full">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white truncate">
                  {task.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                  {task.description}
                </p>
              </div>

              <div className="flex gap-2">
                {/* Optional Task Actions */}
                <ConfettiBoth />
                <Button variant={"destructive"}>
                  <AiOutlineDelete />
                </Button>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
