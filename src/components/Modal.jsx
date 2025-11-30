import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

function Modal({
  title,
  content,
  show = false,
  onClose = () => {},
  onConfirm = () => {},
}) {
  return (
    show &&
    ReactDOM.createPortal(
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-hidden="true"
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">{content}</div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Annulla
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onConfirm}
              >
                Conferma
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  );
}

export default Modal;
