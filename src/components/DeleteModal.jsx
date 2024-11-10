import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const DeleteModal = ({ show, onHide, onDelete }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="delete-modal"
      centered
    >
      <Modal.Body
        style={{ textAlign: "center", height: "350px", paddingTop: "50px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="yellow"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-circle-alert"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        <p>
          <b>Are you sure?</b>
        </p>
        <p>If You delete this Memeber Then this action can not be undone.</p>
        <Button
          variant="primary"
          onClick={onDelete}
          style={{ marginRight: "20px" }}
        >
          Yes, delete it!
        </Button>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
