import { Navbar, Nav, Container } from 'react-bootstrap';
import { Film, Heart, PlusSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function CustomNavbar() {
  const location = useLocation();
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Film className="me-2" size={24} />
          Movie Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              active={location.pathname === '/'}
              className="d-flex align-items-center"
            >
              Free Movies
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/favorites" 
              active={location.pathname === '/favorites'}
              className="d-flex align-items-center"
            >
              <Heart className="me-1" size={18} />
              My Favourite Movies
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/request" 
              active={location.pathname === '/request'}
              className="d-flex align-items-center"
            >
              <PlusSquare className="me-1" size={18} />
              Movie Request Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;