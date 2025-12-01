import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Modal from "./Modal";
const EditTaskModal = ({ show, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "To do");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "");
    }
  }, [task]);

  const editFormRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      id: task.id,
      title,
      description,
      status,
    };
    onSave(updatedTask);
  };

  return (
    <>
      <Modal
        show={show}
        title="Modifica Task"
        onClose={onClose}
        onConfirm={() => editFormRef.current.requestSubmit()}
        content={
          <form ref={editFormRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="taskTitle" className="form-label">
                Titolo
              </label>
              <input
                type="text"
                className="form-control"
                id="taskTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titolo del task"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="taskDescription" className="form-label">
                Descrizione
              </label>
              <textarea
                className="form-control"
                id="taskDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrizione della task"
                rows={4}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="taskStatus" className="form-label">
                Stato
              </label>
              <select
                className="form-select"
                id="taskStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="To do">To do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </form>
        }
      />
    </>
  );
};

export default EditTaskModal;
