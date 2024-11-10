
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { API_ENDPOINTS } from "../appContants";
import { Trash } from "lucide-react";
import AddStudent from "./AddStudent";
import DeleteModal from "./DeleteModal";
import { Notification } from "./Notification";
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS}?page=${currentPage}&limit=${entriesPerPage}`
      );
      setStudents(response?.data?.students);
      setTotalPages(response?.data?.pages);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [currentPage, entriesPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEntriesChange = (e) => {
    const newPerPage = parseInt(e.target.value, 10) || 10;
    setEntriesPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_ENDPOINTS}/${selectedStudent}`);
      setNotification({
        show: true,
        message: "Student Deleted successfully!",
        variant: "success",
      });
      setStudents(
        students.filter((student) => student.student_id !== selectedStudent)
      );
      setDeleteModalShow(false);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      setNotification({
        show: true,
        message: "There was an error deleting the student. Please try again.",
        variant: "danger",
      });
    }
  };

  const handleModel = (studentId) => {
    setSelectedStudent(studentId);
    setDeleteModalShow(true);
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
      <Card
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "15px",
          height: "80px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}
      >
        <Form.Control placeholder="QA" style={{ width: "300px" }} />
        <Button
          variant="success"
          style={{ width: "300px" }}
          onClick={() => setModalShow(true)}
        >
          Add New Member
        </Button>
      </Card>
      <Card
        style={{
          padding: "20px",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Member Name</th>
              <th scope="col">Member Email</th>
              <th scope="col">Age</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student?.student_id}>
                <th scope="row">{student?.student_id}</th>
                <td>{student?.member_name}</td>
                <td>{student?.member_email}</td>
                <td>{student?.member_age}</td>
                <td style={{ textAlign: "center", cursor: "pointer" }}>
                  <Trash
                    style={{ color: "red" }}
                    onClick={() => handleModel(student.student_id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            background: "none",
          }}
        >
          <div
            style={{
              width: "200px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <span>Show</span>
            <input
              type="number"
              value={entriesPerPage}
              onChange={handleEntriesChange}
              style={{ width: "60px", height: "25px", textAlign: "center" }}
              min={1}
            />
            <span>entries</span>
          </div>
          <div>
            <Pagination>
              <Pagination.Item
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                First
              </Pagination.Item>
              <Pagination.Item
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Pagination.Item>
              <Pagination.Item active style={{ pointerEvents: "none" }}>
                {currentPage} / {totalPages}
              </Pagination.Item>
              <Pagination.Item
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Pagination.Item>
              <Pagination.Item
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </Pagination.Item>
            </Pagination>
          </div>
        </div>
      </Card>
      <AddStudent
        show={modalShow}
        onHide={() => setModalShow(false)}
        onStudentAdded={fetchStudents}
      />
      <DeleteModal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Students;
