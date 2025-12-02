import React from "react";
import { Link } from "react-router-dom";
import TaskList from "../pages/TaskList";
const TaskRow = React.memo(({ task }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "To do":
        return "bg-danger text-white";
      case "Doing":
        return "bg-warning";
      case "Done":
        return "bg-success text-white";
      default:
        return "";
    }
  };
  return (
    <tr>
      <td className="align-middle">
        <Link to={`/task/${task.id}`}>{task.title}</Link>
      </td>
      <td className={getStatusClass(task.status)}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString("it-IT")}</td>
    </tr>
  );
});

export default TaskRow;
