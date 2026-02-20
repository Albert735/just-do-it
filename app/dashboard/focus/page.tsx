"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTask } from "../../context/TaskContext";
import { Play, Pause, RotateCcw, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function FocusMode() {
    const { tasks, updateTaskStatus } = useTask();
    const activeTasks = tasks.filter((t) => !t.completed && t.status !== "done");

    const [selectedTaskId, setSelectedTaskId] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const totalTime = isBreak ? 5 * 60 : 25 * 60;
    const strokeDashoffset = circumference - (timeLeft / totalTime) * circumference;

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (isActive && timeLeft === 0) {
            // Timer finished
            setIsActive(false);
            triggerComplete();

            // Auto switch between work and break
            if (!isBreak) {
                setIsBreak(true);
                setTimeLeft(5 * 60);
            } else {
                setIsBreak(false);
                setTimeLeft(25 * 60);
            }
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, isBreak]);

    const triggerComplete = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#3b82f6", "#10b981", "#f59e0b"],
        });
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    };

    const completeCurrentTask = () => {
        if (selectedTaskId) {
            updateTaskStatus(selectedTaskId, "done");
            triggerComplete();
            setSelectedTaskId("");
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const selectedTask = activeTasks.find((t) => t.id === selectedTaskId);

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 max-w-2xl mx-auto">
            <div className="w-full text-center mb-10">
                <h1 className="text-4xl font-bold mb-2 break-words">Deep Work Focus</h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Eliminate distractions and tackle your most important tasks.
                </p>
            </div>

            <div className="relative flex items-center justify-center mb-12">
                <svg className="w-[300px] h-[300px] transform -rotate-90">
                    <circle
                        cx="150"
                        cy="150"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        className="text-slate-200 dark:text-slate-800"
                    />
                    <circle
                        cx="150"
                        cy="150"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                        className={`${isBreak ? "text-slate-500" : "text-slate-800 dark:text-slate-200"
                            } transition-all duration-1000 ease-linear`}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-6xl font-bold tracking-tighter mb-2">
                        {formatTime(timeLeft)}
                    </span>
                    <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${isBreak
                                ? "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                                : "bg-slate-800 text-slate-100 dark:bg-slate-200 dark:text-slate-800"
                            }`}
                    >
                        {isBreak ? "Short Break" : "Focus Session"}
                    </span>
                </div>
            </div>

            <div className="flex gap-4 mb-12">
                <button
                    onClick={toggleTimer}
                    className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105 ${isActive
                            ? "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                            : "bg-slate-800 text-white shadow-lg shadow-slate-500/30 dark:bg-slate-200 dark:text-slate-900"
                        }`}
                >
                    {isActive ? (
                        <>
                            <Pause size={24} /> Pause
                        </>
                    ) : (
                        <>
                            <Play size={24} /> Start Focus
                        </>
                    )}
                </button>
                <button
                    onClick={resetTimer}
                    className="flex items-center justify-center p-4 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 transition"
                >
                    <RotateCcw size={24} />
                </button>
            </div>

            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-semibold mb-4 text-center">What are you working on?</h3>
                {selectedTask ? (
                    <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                        <div>
                            <p className="font-medium text-slate-800 dark:text-slate-200">
                                {selectedTask.title}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={completeCurrentTask}
                                className="p-2 text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 rounded-lg transition"
                                title="Mark as done"
                            >
                                <CheckCircle2 size={24} />
                            </button>
                            <button
                                onClick={() => setSelectedTaskId("")}
                                className="p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition text-sm font-medium"
                            >
                                Change
                            </button>
                        </div>
                    </div>
                ) : (
                    <select
                        value={selectedTaskId}
                        onChange={(e) => setSelectedTaskId(e.target.value)}
                        className="w-full p-4 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-slate-500 appearance-none"
                    >
                        <option value="" disabled>Select a priority task...</option>
                        {activeTasks.length === 0 && <option disabled>No active tasks available. Add some first!</option>}
                        {activeTasks.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.title}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    );
}
