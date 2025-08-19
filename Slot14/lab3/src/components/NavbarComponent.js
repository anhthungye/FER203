import React, { useState } from "react";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import ProfileWizardModal from "./ProfileWizardModal";

function NavbarComponent({ quickSearch, setQuickSearch }) {
  const [showProfileWizard, setShowProfileWizard] = useState(false);

  return (
    <>
      <Navbar expand="lg" className="navbar-pastel shadow-sm" sticky="top">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand href="#">Student Management</Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar" />

          <Navbar.Collapse id="navbar" className="flex-grow-1">
            <Nav className="mx-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Students</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link onClick={() => setShowProfileWizard(true)}>Build Profile</Nav.Link>
            </Nav>

            <Form className="d-flex ms-auto">
              <FormControl
                type="search"
                placeholder="Quick search"
                className="me-2"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ProfileWizardModal 
        show={showProfileWizard} 
        onHide={() => setShowProfileWizard(false)} 
      />
    </>
  );
}

NavbarComponent.propTypes = {
  quickSearch: PropTypes.string.isRequired,
  setQuickSearch: PropTypes.func.isRequired,
};

export default NavbarComponent;