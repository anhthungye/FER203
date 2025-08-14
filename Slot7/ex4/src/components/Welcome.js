import React from "react";
import { Alert } from "react-bootstrap";

const Welcome = ({ name }) => {
  return (
    <Alert variant="primary" className="text-center fw-bold">
      Welcome, {name}!
    </Alert>
  );
};

export default Welcome;
