import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false); // <-- AGGIUNGI QUESTO BLOCCO
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (taskToAdd) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(taskToAdd),
    });
    const result = await res.json();
    if (result.success) {
      setTasks((prevTasks) => [...prevTasks, result.task]);
      return true;
    } else {
      throw new Error(
        result.message || "Errore sconosciuto durante l/inserimento della task"
      );
    }
  };

  const removeTask = async (taskId) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.success) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } else {
      throw new Error(result.message);
    }
  };

  const updTask = async (updatedTask) => {
    const res = await fetch(`${API_URL}/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const result = await res.json();
    if (result.success) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === result.task.id ? result.task : task
        )
      );
    } else {
      throw new Error(result.message);
    }
  };

  return { tasks, isLoading, addTask, removeTask, updTask };
}

export default useTasks;
