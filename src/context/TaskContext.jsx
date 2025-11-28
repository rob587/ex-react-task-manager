import { createContext, useState, useEffect } from "react";
import useTasks from "../components/useTasks";

const API_URL = import.meta.env.VITE_API_URL; //

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const taskData = useTasks();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTasks(data);
        console.log("Dati ricevuti dall'API:", data); // Il console.log qui è corretto
      } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ taskData }}>{children}</TaskContext.Provider>
  );
};
