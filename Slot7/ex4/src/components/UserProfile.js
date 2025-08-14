import React from "react";
import { Card } from "react-bootstrap";

const UserProfile = ({ user }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>User Profile</Card.Title>
        <Card.Text>
          <strong>Name:</strong> {user.name} <br />
          <strong>Age:</strong> {user.age}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;
