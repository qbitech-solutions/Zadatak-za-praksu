import { Modal, Button } from "react-bootstrap";
import { ModalProps } from "../../types";
import { useState } from "react";

const CustomModal = ({
  show,
  handleClose,
  handleConfirm,
  title,
  children,
  description,
  confirmText = "Confirm",
  currentPriority,
  handlePriorityChange,
  handleDescriptionChange,
  readOnly,
}: ModalProps) => {
  const [newPriority, setNewPriority] = useState(currentPriority || "red");
  const [newDescription, setNewDescription] = useState(description || "");

  const showPriorityDropdown = title === "Edit Task" || title === "Add Task";

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
        {showPriorityDropdown && (
          <>
            <label style={{ marginLeft: "10px" }}>Priority:</label>
            <select
              value={newPriority}
              onChange={(e) => {
                const selectedPriority = e.target.value as
                  | "red"
                  | "yellow"
                  | "green";
                setNewPriority(selectedPriority);
                handlePriorityChange?.(selectedPriority);
              }}
            >
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
            </select>
          </>
        )}
        {description !== undefined && (
          <div style={{ marginTop: "20px" }}>
            <label>Description:</label>
            <textarea
              style={{ height: "100px", width: "100%" }}
              value={newDescription}
              onChange={(e) => {
                setNewDescription(e.target.value);
                handleDescriptionChange?.(e.target.value);
              }}
              readOnly={readOnly}
            >
              {description}
            </textarea>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {handleConfirm && (
          <Button
            variant="primary"
            onClick={() => handleConfirm(newPriority, newDescription)}
          >
            {confirmText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
