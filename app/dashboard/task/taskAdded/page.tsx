"use client";

import React from "react";

type Task = {
  id: number;
  title: string;
  description: string;
};

const mockTasks: Task[] = [
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
  return (
    <div className="flex flex-col justify-center items-center gap-6 px-4">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Tasks Added
      </h1>

      {mockTasks.map((task) => (
        <div key={task.id} className="w-full max-w-2xl">
          <div className="flex gap-4 p-5 bg-white dark:bg-white/5 rounded-xl shadow-sm border border-gray-200 dark:border-white/10 transition-all hover:shadow-md">
            <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600 font-bold text-lg">
              {task.id}
            </div>

            <div className="flex flex-col gap-1 overflow-hidden">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white truncate">
                {task.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                {task.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
