"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { IoMdArrowRoundUp } from "react-icons/io";
import { useTask } from "../../../context/TaskContext";
import { toast } from "sonner";

interface TaskData {
  title: string;
  description: string;
}

export default function Page() {
  const [showTask, setShowTask] = useState(false);
  const [taskData, setTaskData] = useState<TaskData>({
    title: "",
    description: "",
  });

  const { addTask } = useTask();

  const toggleTask = () => setShowTask(!showTask);

  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setTaskData({ ...taskData, [e.target.name]: e.target.value });

  const handleAddTask = () => {
    const { title, description } = taskData;
    if (title.trim() && description.trim()) {
      addTask(title, description);
      setTaskData({ title: "", description: "" });
      setShowTask(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 px-4 py-8 ">
      <div className="flex justify-between items-center w-full ">
        <h1 className="text-3xl font-bold">{showTask ? "Add Task" : "Task"}</h1>
        <Button
          className="gap-2"
          onClick={() => {
            handleAddTask();
            toast("Good Job 👍", {
              description: "Task has been added successfully 🎉",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
          }}
          disabled={!taskData.title.trim() || !taskData.description.trim()}
          aria-label="Add Task"
        >
          <IoIosAdd size={30} />
          Add
        </Button>
      </div>
      <div className="flex flex-col items-start justify-start h-[calc(100vh-14rem)] w-full ">
        {showTask ? (
          <div className="relative  w-full h-[calc(100vh-14rem)]">
            <div className="absolute inset-0">
              <div className="flex flex-col items-center justify-start p-4 w-full h-full">
                <div className="flex flex-col gap-4 w-full max-w-3xl">
                  {/* Task Title Textarea */}
                  <textarea
                    name="title"
                    placeholder="Task Title"
                    value={taskData.title}
                    onChange={handleChange}
                    rows={1}
                    onInput={handleAutoResize}
                    className="w-full px-3 py-2 text-2xl font-bold text-gray-800 dark:text-white bg-gray-100 dark:bg-white/10 rounded-md outline-none resize-none overflow-hidden leading-tight"
                  />

                  {/* Task Description Textarea */}
                  <textarea
                    name="description"
                    placeholder="Task Description..."
                    rows={1}
                    value={taskData.description}
                    onChange={handleChange}
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
          <Button className="gap-2">
            <IoMdArrowRoundUp size={30} />
          </Button>
        </div>
      </div>
    </div>
  );
}
