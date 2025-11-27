import React from "react";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div>
      <h1>LISTA TASK</h1>
    </div>
  );
};

export default TaskList;
