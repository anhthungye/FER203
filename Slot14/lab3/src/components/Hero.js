import React from "react";
import { Container } from "react-bootstrap";

function Hero() {
  return (
    <div className="hero-section">
      <Container>
        <h1 className="fw-bold">Student Management</h1>
        <p className="text-muted">
          Manage, filter, and explore the student list with ease.
        </p>
      </Container>
    </div>
  );
}

export default Hero;
