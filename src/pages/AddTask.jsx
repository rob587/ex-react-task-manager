import React, { useState, useRef } from "react";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

  const inputDescriptionRef = useRef();
  const inputSelectRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Il nome del task non può essere vuoto");
      return;
    }

    for (let i = 0; i < symbols.length; i++) {
      if (title.includes(symbols[i])) {
        setError("Il nome del task non può contenere simboli speciali");
        return;
      }
    }

    setError("");

    const descrizione = inputDescriptionRef.current.value;
    const select = inputSelectRef.current.value;

    const newTask = {
      title: title,
      description: descrizione,
      status: status,
      createdAt: new Date().toISOString(),
    };
    console.log("Oggetto Task pronto:", newTask);
  };

  return (
    <>
      <div>
        <h2 className="text-center my-5">AGGIUNGI TASK</h2>
      </div>

      <div className="container">
        <div className="row">
          <div className="col ">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Inserisci Task"
                className="form-control mb-2"
              />
              {error && <div className="alert alert-danger">{error}</div>}
              <textarea
                name="description"
                placeholder="Descrizione task"
                ref={inputDescriptionRef}
                className="form-control mb-2"
                required
              ></textarea>
              <select
                name="status"
                ref={inputSelectRef}
                className="form-control mb-2"
              >
                <option value="To do">To do</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
              <button type="submit" className="btn btn-success">
                Aggiungi Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTask;
