"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { IoMdArrowRoundUp } from "react-icons/io";

export default function Page() {
  const [showTask, setShowTask] = useState(false);

  const toggleTask = () => {
    setShowTask(!showTask);
  };

  // Handler for auto-resizing textarea
  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{showTask ? "Task" : "Add Task"}</h1>
        <Button className="gap-2">
          <IoIosAdd size={30} />
          Add
        </Button>
      </div>
      <div className="flex flex-col items-start justify-start h-[calc(100vh-14rem)] w-full">
        {showTask ? (
          <div className="relative  w-full h-[calc(100vh-14rem)]">
            <div className="absolute inset-0">
              <div className="flex flex-col items-center justify-start p-4 w-full h-full">
                <div className="flex flex-col gap-4 w-full max-w-3xl">
                  {/* Task Title Textarea */}
                  <textarea
                    placeholder="Task Title"
                    rows={1}
                    onInput={handleAutoResize}
                    className="w-full px-3 py-2 text-2xl font-bold text-gray-800 dark:text-white bg-gray-100 dark:bg-white/10 rounded-md outline-none resize-none overflow-hidden leading-tight"
                  />

                  {/* Task Description Textarea */}
                  <textarea
                    placeholder="Task Description..."
                    rows={1}
                    onInput={handleAutoResize}
                    className="w-full px-3 py-2 text-base text-gray-700 dark:text-white  bg-gray-100 dark:bg-white/10 rounded-md outline-none resize-none overflow-hidden leading-tight mb-[5rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center dark:bg-white/5 bg-gray-100 p-4 w-full h-full rounded-md border-dashed border-2 dark:border-white/30 transition-all duration-200 ease-in-out">
            <span
              onClick={toggleTask}
              className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-600"
            >
              <IoIosAdd size={26} /> Add a new task
            </span>
          </div>
        )}
        <div className="flex absolute bottom-5 right-5 justify-end items-center">
          <Button className="gap-2" onClick={handleScrollTop}>
            <IoMdArrowRoundUp size={30} />
          </Button>
        </div>
      </div>
    </div>
  );
}
