"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTask } from "../context/TaskContext";
import { Plus, CheckCircle2, ListTodo, Target } from "lucide-react";

export default function Dashboard() {
  const { tasks, completedTasks, addTask } = useTask();
  const [quickAdd, setQuickAdd] = useState("");

  const totalTasksCount = tasks.length + completedTasks.length;
  const completionRate = totalTasksCount > 0 ? Math.round((completedTasks.length / totalTasksCount) * 100) : 0;

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickAdd.trim()) {
      addTask(quickAdd.trim(), "");
      setQuickAdd("");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 h-full max-w-5xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Good Day!</h1>
        <p className="text-slate-500">Here is your productivity overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Cards */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl flex items-center justify-between border border-slate-200 dark:border-slate-700/50">
          <div>
            <p className="text-slate-600 dark:text-slate-400 font-medium mb-1">Active Tasks</p>
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100">{tasks.length}</h2>
          </div>
          <div className="bg-slate-200 dark:bg-slate-700/50 p-4 rounded-xl text-slate-700 dark:text-slate-300">
            <ListTodo size={32} />
          </div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800/60 p-6 rounded-2xl flex items-center justify-between border border-slate-200 dark:border-slate-700/50">
          <div>
            <p className="text-slate-600 dark:text-slate-400 font-medium mb-1">Completed</p>
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100">{completedTasks.length}</h2>
          </div>
          <div className="bg-slate-200 dark:bg-slate-700/50 p-4 rounded-xl text-slate-700 dark:text-slate-300">
            <CheckCircle2 size={32} />
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl flex flex-col justify-center border border-slate-200 dark:border-slate-700/50">
          <div className="flex justify-between items-center mb-2">
            <p className="text-slate-600 dark:text-slate-400 font-medium">Completion Rate</p>
            <span className="font-bold text-slate-700 dark:text-slate-300">{completionRate}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
            <div
              className="bg-slate-600 dark:bg-slate-400 rounded-full h-3 transition-all duration-1000 ease-out"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Smart Quick Add */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mt-2">
        <h2 className="text-xl font-semibold mb-4">Smart Quick Add</h2>
        <form onSubmit={handleQuickAdd} className="flex gap-3">
          <input
            type="text"
            placeholder="Type a task and hit Enter to add it instantly..."
            value={quickAdd}
            onChange={(e) => setQuickAdd(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            disabled={!quickAdd.trim()}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-900 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add Task
          </button>
        </form>
      </div>

      {/* Navigation Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <Link href="/dashboard/kanban" className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all hover:shadow-md flex items-start gap-4">
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-slate-600 dark:text-slate-300 group-hover:scale-110 transition-transform">
            <ListTodo size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">Kanban Board</h3>
            <p className="text-slate-500 text-sm mt-1">Organize your workflow visually with drag-and-drop columns.</p>
          </div>
        </Link>
        <Link href="/dashboard/focus" className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all hover:shadow-md flex items-start gap-4">
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-slate-600 dark:text-slate-300 group-hover:scale-110 transition-transform">
            <Target size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">Focus Mode</h3>
            <p className="text-slate-500 text-sm mt-1">Start a deep work cycle and conquer your most important tasks.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
