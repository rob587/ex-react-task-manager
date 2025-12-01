import React from "react";
import { useState, useRef } from "react";
import Modal from "./Modal";
const EditTaskModal = ({ show, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "To do");

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
            <label>titolo</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titolo del task"
            />
            <textarea
              name=""
              id=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrizione della task"
              rows={4}
            ></textarea>

            <select
              name=""
              id=""
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </form>
        }
      />
    </>
  );
};

export default EditTaskModal;
