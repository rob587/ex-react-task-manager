import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("URL usato per fetch:", `${API_URL}/tasks`);
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

  const removeTask = () => {
    console.log("Remove Task chiamata");
  };
  const updTask = () => {
    console.log("Update Task chiamata");
  };

  return { tasks, isLoading, addTask, removeTask, updTask };
}

export default useTasks;
