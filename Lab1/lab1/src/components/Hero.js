import React from "react";
import { Container } from "react-bootstrap";

const Hero = () => {
  return (
    <div className="hero">
      <Container className="py-5 text-center">
        <h1 className="display-4 fw-bold text-dark mb-4">Explore our simple, healthy recipes</h1>
        <p className="lead text-muted fs-5 lh-lg">
          Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. Use the search bar
              to find a recipe by name or ingredient, or simply scroll the list and let something delicious catch your
              eye.
        </p>
      </Container>
    </div>
  );
};

export default Hero;