"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { useTask } from "../../context/TaskContext";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { tasks, deleteTask } = useTask();
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="flex flex-col items-center justify-start px-4 py-8">
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
              <Button
                variant={"destructive"}
                size="sm"
                onClick={() => deleteTask(task.id)} // Delete function works here
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center gap-2 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-700 rounded-xl shadow-sm">
            <p>No completed tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
