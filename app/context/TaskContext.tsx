"use client";

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
  tasks: Task[]; // List of tasks
  addTask: (title: string, description: string) => void; // Function to add a task
  deleteTask: (id: string) => void; // Function to delete a task
  toggleTask: (id: string) => void; // Function to toggle task completion
};

// Create the context with default value undefined
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Create the provider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  // Local state to hold the list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // Placeholder function to add a task
  const addTask = (title: string, description: string) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Placeholder function to delete a task
  const deleteTask = () => {};

  // Placeholder function to toggle task completion
  const toggleTask = () => {};

  // Provide the state and functions to child components
  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
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
