"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useTask, TaskStatus, Task } from "../../context/TaskContext";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";

const columns: { id: TaskStatus; title: string; color: string }[] = [
    { id: "todo", title: "To Do", color: "bg-slate-50 dark:bg-slate-800/50" },
    { id: "in-progress", title: "In Progress", color: "bg-slate-100 dark:bg-slate-800" },
    { id: "done", title: "Done", color: "bg-slate-200 dark:bg-slate-700" },
];

export default function KanbanBoard() {
    const { tasks, completedTasks, updateTaskStatus, addTask, deleteTask, deleteCompletedTask } = useTask();
    const [isMounted, setIsMounted] = useState(false);

    // Combine all tasks for the board
    const [boardTasks, setBoardTasks] = useState<Task[]>([]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setBoardTasks([...tasks, ...completedTasks]);
    }, [tasks, completedTasks]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newStatus = destination.droppableId as TaskStatus;

        if (newStatus === "done" && source.droppableId !== "done") {
            triggerKanbanConfetti();
        }

        updateTaskStatus(draggableId, newStatus);
    };

    const triggerKanbanConfetti = () => {
        const end = Date.now() + 2 * 1000;
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

        const frame = () => {
            if (Date.now() > end) return;
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors: colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors: colors,
            });
            requestAnimationFrame(frame);
        };

        frame();
    };

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle.trim(), "");
            setNewTaskTitle("");
        }
    };

    const handleDelete = (id: string, isCompleted: boolean) => {
        if (isCompleted) {
            deleteCompletedTask(id);
        } else {
            deleteTask(id);
        }
    };

    if (!isMounted) return null;

    return (
        <div className="flex flex-col h-full gap-4 p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Kanban Board</h1>
                <form onSubmit={handleAddTask} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Quick add task..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 rounded-full hover:bg-slate-900 dark:hover:bg-slate-300 transition"
                    >
                        <Plus size={20} />
                    </button>
                </form>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-6 h-full overflow-x-auto pb-4">
                    {columns.map((col) => {
                        const columnTasks = boardTasks.filter((task) => task.status === col.id);

                        return (
                            <div key={col.id} className="flex flex-col w-80 min-w-80 gap-3">
                                <div className="flex items-center justify-between pb-2">
                                    <h2 className="font-semibold text-lg">{col.title}</h2>
                                    <span className="text-sm px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                        {columnTasks.length}
                                    </span>
                                </div>

                                <Droppable droppableId={col.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`flex-1 overflow-y-auto rounded-xl p-3 ${col.color} border border-transparent transition-colors ${snapshot.isDraggingOver ? 'border-slate-400 dark:border-slate-500' : ''}`}
                                        >
                                            {columnTasks.map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className={`mb-3 flex flex-col gap-2 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm transition-shadow ${snapshot.isDragging ? 'shadow-lg ring-2 ring-slate-500/50' : 'hover:shadow-md'} border border-slate-200 dark:border-slate-700`}
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <span className="font-medium text-slate-800 dark:text-slate-100 break-words pr-2">
                                                                    {task.title}
                                                                </span>
                                                                <div className="flex gap-1 -mr-2 -mt-2">
                                                                    <button
                                                                        onClick={() => handleDelete(task.id, task.completed)}
                                                                        className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                    <div
                                                                        {...provided.dragHandleProps}
                                                                        className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-grab active:cursor-grabbing rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                                                                    >
                                                                        <GripVertical size={16} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {task.description && (
                                                                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                                                    {task.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}
