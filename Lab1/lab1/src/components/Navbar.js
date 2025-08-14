import React from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Leaf, Heart } from "lucide-react";

const NavbarComponent = ({ favouritesCount, onShowRequestForm }) => {
  const navigate = useNavigate();
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3 custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center custom-navbar-brand">
          <Leaf className="me-2" size={32} color="#388250ff" />
          <span className="fw-semibold fs-5 text-dark">Healthy Recipe Finder</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto custom-navbar-nav">
            <Nav.Link as={NavLink} to="/" className="custom-navbar-link mx-3">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="custom-navbar-link mx-3">About</Nav.Link>
            <Nav.Link as={NavLink} to="/recipes" className="custom-navbar-link mx-3">Recipes</Nav.Link>
            <Nav.Link
              as="span"
              className="custom-navbar-link mx-3"
              style={{ cursor: "pointer" }}
              onClick={onShowRequestForm}
            >
              Recipe Request Form
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-2">
            <Button
              style={{ backgroundColor: "#065f46", borderColor: "#065f46" }}
              variant="primary"
              className="ms-2 custom-btn"
              onClick={() => navigate("/recipes")}
            >
              Browse Recipes
            </Button>
            <Button
              variant="outline-danger"
              className="ms-2 position-relative custom-badge-btn custom-btn"
              style={{ borderRadius: "999px" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              title="Favourites"
            >
              <Heart size={18} className="me-1" color="#dc3545" />
              Favourites
              {favouritesCount > 0 && (
                <Badge pill className="position-absolute top-0 start-100 translate-middle custom-badge">
                  {favouritesCount}
                </Badge>
              )}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;