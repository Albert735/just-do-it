"use client";

import { Reorder } from "framer-motion";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineDelete } from "react-icons/ai";
import { ConfettiBoth } from "@/components/ui/confettiBoth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useTask } from "../../../context/TaskContext";

export default function Page() {
  const { tasks, setTasks, deleteTask } = useTask();

  return (
    <div className="flex flex-col justify-center items-center gap-6 px-4 py-8">
      <div className="flex justify-between items-center gap-4 w-full xl:max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white text-center sm:text-left">
          Tasks Added
        </h1>
        <Popover>
          <PopoverTrigger>
            <HiOutlineDotsHorizontal size={30} />
          </PopoverTrigger>
          <PopoverContent className="w-[100px] mr-[2rem] flex justify-center items-center">
            <Button variant={"default"} size={"sm"}>
              Clear All
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {tasks.length > 0 ? (
        <Reorder.Group
          axis="y"
          values={tasks}
          onReorder={setTasks}
          className="w-full xl:max-w-2xl flex flex-col gap-4"
        >
          {tasks
            .filter((task) => !task.completed) // we filter the tasks that are completed from the list
            .map((task) => (
              <Reorder.Item
                key={task.id}
                value={task}
                className="cursor-grab active:cursor-grabbing"
              >
                <div className="flex flex-col sm:flex-row gap-4 p-5 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 transition-all hover:shadow-sm">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600 font-bold text-lg sm:mb-0 mb-2">
                    {task.id}
                  </div>

                  <div className="flex flex-col gap-1 overflow-hidden w-full">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white truncate">
                      {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                      {task.description}
                    </p>
                  </div>

                  <div className="flex gap-2 sm:mt-0 mt-2 justify-between sm:w-auto w-full">
                    <ConfettiBoth id={task.id} />
                    <Button
                      variant={"destructive"}
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                    >
                      <AiOutlineDelete />
                    </Button>
                  </div>
                </div>
              </Reorder.Item>
            ))}
        </Reorder.Group>
      ) : (
        <div className="flex flex-col justify-center items-center gap-6 px-4 py-8 h-[calc(100vh-14rem)] 0 w-full">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center sm:text-left">
            No Task Added
          </h2>
        </div>
      )}
    </div>
  );
}
