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
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
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
