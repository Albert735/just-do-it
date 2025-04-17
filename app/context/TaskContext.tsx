"use client";

// TaskContext.tsx (Updated)

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of a single task
type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

// Define the shape of the context's value
type TaskContextType = {
  tasks: Task[]; // List of tasks (active tasks)
  completedTasks: Task[]; // List of completed tasks
  addTask: (title: string, description: string) => void; // Function to add a task
  deleteTask: (id: string) => void; // Function to delete a task from active tasks
  deleteCompletedTask: (id: string) => void; // Function to delete a completed task
  toggleTask: (id: string) => void; // Function to toggle task completion
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // setTasks allows components using the context to directly update the task list state
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>; // setCompletedTasks to update completed tasks
};

// Create the context with default value undefined
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Create the provider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [nextId, setNextId] = useState(1);

  // Function to add a new task
  const addTask = (title: string, description: string) => {
    const newTask = {
      id: nextId.toString(),
      title,
      description,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setNextId((prev) => prev + 1);
  };

  // Function to delete a task from the active task list
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Function to delete a task from the completed task list
  const deleteCompletedTask = (id: string) => {
    setCompletedTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        completedTasks,
        addTask,
        deleteTask,
        deleteCompletedTask,
        toggleTask,
        setTasks,
        setCompletedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the TaskContext in any component
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within a TaskProvider");
  return context;
};
