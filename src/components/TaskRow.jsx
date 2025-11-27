import React from "react";

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
      <td>{task.title}</td>
      <td className={getStatusClass(task.status)}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString("it-IT")}</td>
    </tr>
  );
});

export default TaskRow;
