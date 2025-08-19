import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

function StudentCard({ student, onView }) {
  return (
    <Card className="student-card">
      {student.avatar ? (
        <Card.Img variant="top" src={student.avatar} alt={student.name} className="card-img-top" />
      ) : (
        <div className="no-avatar">No Avatar</div>
      )}
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>
          <small className="text-muted">ID: {student.id}</small>
          <br />
          {student.email}
          <br />
          Age: {student.age}
        </Card.Text>
        <Button variant="primary" onClick={() => onView(student)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string
  }),
  onView: PropTypes.func.isRequired
};

export default StudentCard;
