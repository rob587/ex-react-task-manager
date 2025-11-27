import React from "react";
import { useContext, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskRow from "../components/TaskRow";

const TaskList = () => {
  const { tasks } = useContext(TaskContext);

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
          <div className="col-12">
            {tasks.length > 0 ? (
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
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
