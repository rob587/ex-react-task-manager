import { useParams, useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import React, { useContext, useState } from "react";
import useTasks from "../components/useTasks";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { removeTask, updTask } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const taskData = useContext(TaskContext);
  const { tasks, isLoading } = taskData || { tasks: [], isLoading: true };

  const task = tasks.find((t) => t.id === parseInt(id));

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSave = async (updatedTask) => {
    try {
      await updTask(updatedTask);
    } catch {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await removeTask(task.id);

      navigate("/");
      setShowModal(false);
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

  const handleDeleteClick = () => {
    console.log("Apertura modale");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log("chiusura modale");
    setShowModal(false);
  };

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
                <button className="btn btn-danger" onClick={handleDeleteClick}>
                  Elimina Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        title={"Conferma Eliminazione"}
        content={"Sei sicuro di voler eliminare la task?"}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      ></Modal>
    </>
  );
};

export default TaskDetail;
