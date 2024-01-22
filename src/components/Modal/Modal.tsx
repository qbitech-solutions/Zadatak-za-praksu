import { Modal, Button } from "react-bootstrap";
import { ModalProps } from "../../types";
import { useState } from "react";

const CustomModal = ({
  show,
  handleClose,
  handleConfirm,
  title,
  children,
  confirmText = "Confirm",
  currentPriority,
  handlePriorityChange,
}: ModalProps) => {
  const [newPriority, setNewPriority] = useState(currentPriority || "red");

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {handleConfirm && (
          <Button variant="primary" onClick={() => handleConfirm(newPriority)}>
            {confirmText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
