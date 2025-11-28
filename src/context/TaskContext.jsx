import { createContext } from "react";

import useTasks from "../components/useTasks";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const taskData = useTasks();

  return (
    <TaskContext.Provider value={taskData}>{children}</TaskContext.Provider>
  );
};
