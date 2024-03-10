import { nanoid } from "nanoid";
import { useState } from "react";

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<{ id: string; title: string }[]>([]);

  const completeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, updatedTask: { title: string }) => {
    const newTasks = tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task));
    setTasks(newTasks);
  };

  const addTask = (title: string) => {
    if (title.trim() === "") {
      return;
    }
    const newTask = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const filterTasks = (keyword: string) => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  return {
    tasks,
    completeTask,
    updateTask,
    addTask,
    filterTasks,
  };
};
