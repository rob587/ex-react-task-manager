import React, { useState } from "react";
import { useContext, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskRow from "../components/TaskRow";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const sortedTasks = useMemo(() => {
    const taskCopy = [...tasks];
    taskCopy.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title) * sortOrder;
        case "status":
          const statusOrder = ["To do", "Doing", "Done"];
          const indexA = statusOrder.indexOf(a.status);
          const indexB = statusOrder.indexOf(b.status);
          return (indexA - indexB) * sortOrder;
        case "createdAt":
          return (
            (new Date(a.createdAt).getTime() -
              new Date(b.createdAt).getTime()) *
            sortOrder
          );
        default:
          return 0;
      }
    });
    return taskCopy;
  }, [tasks, sortBy, sortOrder]);

  if (!tasks) {
    return <p className="text-center">Caricamento task in corso...</p>;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-5">Lista Task</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-12">
            {tasks.length > 0 ? (
              <table className="table table-striped table-hover align-middle ">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      onClick={() => handleSort("title")}
                      style={{ cursor: "pointer" }}
                    >
                      Task
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("status")}
                      style={{ cursor: "pointer" }}
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      onClick={() => handleSort("createdAt")}
                      style={{ cursor: "pointer" }}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTasks.map((task) => (
                    <TaskRow key={task.id} task={task} />
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">Nessun task disponibile.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
