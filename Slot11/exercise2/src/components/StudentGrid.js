import React from "react";
import { Row, Col } from "react-bootstrap";
import StudentCard from "./StudentCard";

function StudentGrid({ students, onView }) {
  return (
    <Row className="g-4">
      {students.map((student) => (
        <Col key={student.id} xs={12} md={6} lg={4}>
          <StudentCard student={student} onView={onView} />
        </Col>
      ))}
    </Row>
  );
}

export default StudentGrid;
