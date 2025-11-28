import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/tasks`);
        if (!res.ok) {
          throw new Error("La risposta del Network non è andata.");
        }
        const data = await res.json();
        setTasks(data);
        console.log("DATI RECUPERATI ATTRAVERSO HOOK", data);
      } catch (error) {
        console.error("Problema nel recuperare i dati", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = () => {
    console.log("Add Task chiamata");
  };
  const removeTask = () => {
    console.log("Remove Task chiamata");
  };
  const updTask = () => {
    console.log("Update Task chiamata");
  };

  return { tasks, addTask, removeTask, updTask };
}

export default useTasks;
