import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';
import { ShoppingCart, User, Sun, Moon } from 'lucide-react';
import '../styles/NavBar.css'; 

const NavBar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const { totalQuantity } = useCart();
  const { favourites } = useFavourites();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setExpanded(false);
    navigate('/');
  };

  const closeNavbar = () => {
    setExpanded(false);
  };

  return (
    <Navbar expand="lg" expanded={expanded} onToggle={setExpanded} className='custom-navbar'>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={closeNavbar}>
          Restaurant
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={closeNavbar}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/register" onClick={closeNavbar}>
              Register
            </Nav.Link>
          </Nav>
          
          <Nav className="ms-auto align-items-center">
            <Nav.Link 
              as={Link} 
              to="/cart" 
              className="cart-link"
              onClick={closeNavbar}
            >
              <ShoppingCart size={24} />
              {totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
              )}
            </Nav.Link>
            
            <Dropdown align="end" className="me-3">
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic" className="account-toggle">
                <User size={20} className="account-icon" />
                {user ? user.name : 'Account'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {isAuthenticated ? (
                  <>
                    <Dropdown.Item as={Link} to="/profile" onClick={closeNavbar}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/favourites" onClick={closeNavbar} className="favourites-dropdown">
                      My Favourites 
                      {favourites.length > 0 && (
                        <span className="favourites-count">{favourites.length}</span>
                      )}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Logout
                    </Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item as={Link} to="/login" onClick={closeNavbar}>
                    Login
                    </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            
            <Nav.Link onClick={toggleDarkMode} className="theme-toggle">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;