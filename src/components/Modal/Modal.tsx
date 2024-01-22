import { Modal, Button } from "react-bootstrap";
import { ModalProps } from "../../types";

const CustomModal = ({
  show,
  handleClose,
  handleConfirm,
  title,
  children,
  confirmText = "Confirm",
}: ModalProps) => {
  const [newPriority, setNewPriority] = useState(currentPriority || "red");

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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {handleConfirm && (
          <Button variant="primary" onClick={handleConfirm}>
            {confirmText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
