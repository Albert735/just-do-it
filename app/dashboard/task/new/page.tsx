"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import React from "react";
import { IoIosAdd } from "react-icons/io";

export default function Page() {
  const [showTask, setShowTask] = useState(false);

  const toggleTask = () => {
    setShowTask(!showTask);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{showTask ? "Task" : "Add Task"}</h1>
        <Button onClick={toggleTask}>Add</Button>
      </div>
      <div className="flex flex-col items-start justify-start h-[calc(100vh-14rem)]">
        {showTask ? (
          <div className="text-green-500 relative w-full h-full">
            <div className="absolute  w-full h-full">
              <div className="flex flex-col items-start justify-start p-4 w-full  h-full">
                <span className="text-3xl font-bold">
                  <input
                    type="text"
                    placeholder="Task Title"
                    className="w-full h-10 p-2 text-lg font-bold text-gray-900 dark:text-white outline-none"
                  />
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center dark:bg-white/5 bg-gray-100 p-4 w-full h-full rounded-md border-dashed border-2 dark:border-white/30">
            <span
              onClick={toggleTask}
              className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-600"
            >
              <IoIosAdd size={26} /> Add a new task
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
