"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { useTask } from "../../context/TaskContext";

export default function Page() {
  const { tasks } = useTask();

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 bg-gray-50 dark:bg-black">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        ✅ Tasks Completed
      </h1>

      <div className="w-full max-w-2xl flex flex-col gap-4">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-row justify-start items-center gap-4 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-700 rounded-xl shadow-sm"
            >
              <CheckCircle className="text-green-500" size={20} />
              <div className="flex flex-col w-full max-h-[7rem] overflow-hidden">
                <h2 className="text-lg font-semibold text-green-800 dark:text-green-300 line-through">
                  {task.title}
                </h2>
                <p className="text-sm text-green-700 dark:text-green-400 line-through">
                  {task.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No tasks have been completed yet.
          </p>
        )}
      </div>
    </div>
  );
}
