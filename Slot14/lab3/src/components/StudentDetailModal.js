import React from "react";
import { Modal, Card } from "react-bootstrap";

function StudentDetailModal({ show, onHide, student }) {
  if (!student) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          {student.avatar && (
            <Card.Img variant="top" src={student.avatar} alt={student.name} />
          )}
          <Card.Body>
            <Card.Title>{student.name}</Card.Title>
            <Card.Text>
              <strong>ID:</strong> {student.id}
              <br />
              <strong>Email:</strong> {student.email}
              <br />
              <strong>Age:</strong> {student.age}
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default StudentDetailModal;
