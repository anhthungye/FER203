import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";

const NavbarComponent = () => {
  const navigate = useNavigate();
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Leaf className="me-2" size={32} color="#059669" />
        <span className="fw-semibold fs-5 text-dark">Healthy Recipe Finder</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/" className="text-secondary mx-3">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="text-secondary mx-3">About</Nav.Link>
            <Nav.Link as={NavLink} to="/recipes" className="text-secondary mx-3">Recipes</Nav.Link>
          </Nav>
          <Button style={{ backgroundColor: "#065f46", borderColor: "#065f46" }} className="ms-3" variant="primary" onClick={() => navigate("/recipes")}>
            Browse Recipes
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;