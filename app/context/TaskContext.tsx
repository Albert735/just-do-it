"use client";

// TaskContext.tsx (Updated)

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the shape of a single task
export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  status: TaskStatus; // Added for Kanban support
};

// Define the shape of the context's value
type TaskContextType = {
  tasks: Task[]; // List of tasks (active tasks)
  completedTasks: Task[]; // List of completed tasks
  addTask: (title: string, description: string) => void; // Function to add a task
  deleteTask: (id: string) => void; // Function to delete a task from active tasks
  deleteCompletedTask: (id: string) => void; // Function to delete a completed task
  toggleTask: (id: string) => void; // Function to toggle task completion
  updateTaskStatus: (id: string, newStatus: TaskStatus) => void; // Function for Kanban
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

  // Load from localStorage if available
  useEffect(() => {
    const savedTasks = localStorage.getItem("just-do-it-tasks");
    const savedCompleted = localStorage.getItem("just-do-it-completed");
    const savedNextId = localStorage.getItem("just-do-it-nextId");

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedCompleted) setCompletedTasks(JSON.parse(savedCompleted));
    if (savedNextId) setNextId(JSON.parse(savedNextId));
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("just-do-it-tasks", JSON.stringify(tasks));
    localStorage.setItem("just-do-it-completed", JSON.stringify(completedTasks));
    localStorage.setItem("just-do-it-nextId", JSON.stringify(nextId));
  }, [tasks, completedTasks, nextId]);

  // Function to add a new task
  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: nextId.toString(),
      title,
      description,
      completed: false,
      status: "todo",
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
    let completedTaskToMove: Task | undefined;
    
    // Check if task is in active tasks
    setTasks((prev) => {
      const taskIndex = prev.findIndex(t => t.id === id);
      if (taskIndex !== -1) {
        const updatedTask = { ...prev[taskIndex], completed: true, status: "done" as TaskStatus };
        completedTaskToMove = updatedTask;
        return prev.filter(t => t.id !== id);
      }
      return prev;
    });

    if (completedTaskToMove) {
      setCompletedTasks(prev => [...prev, completedTaskToMove!]);
      return;
    }

    // Check if task is in completed tasks (un-toggling)
    setCompletedTasks(prev => {
      const taskIndex = prev.findIndex(t => t.id === id);
      if (taskIndex !== -1) {
        const updatedTask = { ...prev[taskIndex], completed: false, status: "todo" as TaskStatus };
        setTasks(prevTasks => [...prevTasks, updatedTask]);
        return prev.filter(t => t.id !== id);
      }
      return prev;
    });
  };

  const updateTaskStatus = (id: string, newStatus: TaskStatus) => {
    if (newStatus === "done") {
      toggleTask(id); // Use existing logic to move to completed
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
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
        updateTaskStatus,
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
