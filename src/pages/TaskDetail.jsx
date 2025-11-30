import { useParams, useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import React, { useContext } from "react";
import useTasks from "../components/useTasks";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { removeTask } = useTasks();

  const taskData = useContext(TaskContext);
  const { tasks, isLoading } = taskData || { tasks: [], isLoading: true };

  const task = tasks.find((t) => t.id === parseInt(id));

  const handleDelete = async () => {
    try {
      await removeTask(task.id);
      alert("Task eliminato con successo!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="container mt-4">
        <p>Caricamento dettagli task in corso...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mt-4">
        <h2>Task non trovato!</h2>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {task.description}
                </h6>
                <p className="card-text">
                  Stato: {task.status} | Data:{" "}
                  {new Date(task.createdAt).toLocaleDateString("it-IT")}.
                </p>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Elimina Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetail;
