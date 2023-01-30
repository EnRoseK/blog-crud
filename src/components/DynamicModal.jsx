import { Modal } from "react-bootstrap";

export const DynamicModal = ({ title, content, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
    </Modal>
  );
};
