import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { API_ENDPOINTS } from "../appContants";
import axios from "axios";
import { Notification } from "./Notification";

const AddStudent = (props) => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const [formData, setFormData] = useState({
    member_name: "",
    member_email: "",
    member_age: null,
    member_parentid: "",
  });

  const handleSubmit = async () => {
    try {
      await axios.post(API_ENDPOINTS, formData);
      setNotification({
        show: true,
        message: "Student added successfully!",
        variant: "success",
      });
      props.onHide();
      props.onStudentAdded();
    } catch (error) {
      console.error("Error adding student:", error);
      setNotification({
        show: true,
        message: "There was an error adding the student. Please try again.",
        variant: "danger",
      });
    }
  };

  return (
    <>
      {notification.show && (
        <Notification
          variant={notification.variant}
          message={notification.message}
          onClose={() => setNotification({ ...notification, show: false })}
        />
      )}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Member
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Member Name*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Member Name"
                onChange={(e) =>
                  setFormData({ ...formData, member_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Member Email*</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Member Email"
                onChange={(e) =>
                  setFormData({ ...formData, member_email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Member Age*</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Member Age"
                onChange={(e) =>
                  setFormData({ ...formData, member_age: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Member Parent Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Member Parent Id"
                onChange={(e) =>
                  setFormData({ ...formData, member_parentid: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddStudent;
